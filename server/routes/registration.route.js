const express = require("express");
const Registration = require("../models/registration.model");
const Event = require("../models/event.model");
const authorization = require("../middleware/chech_auth");
const { format } = require("date-fns");
const router = express.Router();

router.post("/register/:eventId", authorization, async (req, res) => {
  try {
    const { id } = req; // user id
    const { eventId } = req.params;

    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error_msg: "Event not found" });
    }

    //check for event expiry date
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (event.date < today) {
      return res.status(400).json({ error_msg: "event is closed." });
    }

    // Check duplicate registration
    const existingRegistration = await Registration.findOne({
      user: id,
      event: eventId,
    });

    if (existingRegistration) {
      return res.status(400).json({
        error_msg: "User already registered for this event.",
      });
    }

    // Count registrations for this event
    const totalRegistrations = await Registration.countDocuments({
      event: eventId,
    });

    // Check capacity
    if (totalRegistrations >= event.capacity) {
      return res.status(400).json({
        error_msg: "Capacity is full. Cannot register.",
      });
    }

    // Create registration
    await Registration.create({
      user: id,
      event: eventId,
    });

    res.status(200).json({
      message: "Registration successful.",
    });
  } catch (err) {
    res.status(500).json({ error_msg: err.message });
  }
});

const checkForSeats = async (capacity, eventId) => {
  const eventCount = await Registration.countDocuments({
    event: eventId,
  });

  return capacity - eventCount;
};
//date formatter
const getDate = (date) => {
  return format(new Date(date), "dd-MM-yyyy");
};

//get all registation for user
router.get("/dashboard", authorization, async (req, res) => {
  try {
    const { id } = req;
    const { type } = req.query; // upcoming | past

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let dateFilter = {};
    let sortOption = { "event.date": 1 }; // default ascending

    if (type === "upcoming") {
      dateFilter = { date: { $gte: today } };
      sortOption = { "event.date": 1 }; // nearest first
    } else if (type === "past") {
      dateFilter = { date: { $lt: today } };
      sortOption = { "event.date": -1 }; // latest past first
    }

    const registrations = await Registration.find({ user: id })
      .populate({
        path: "event",
        match: type ? dateFilter : {}, // apply only if type exists
      })
      .lean();

    // Remove null events
    const events = registrations
      .filter((reg) => reg.event !== null)
      .map((reg) => reg.event);

    // Sort manually because sorting on populated field doesn't work directly
    events.sort((a, b) => {
      return type === "past"
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date);
    });

    const data = await Promise.all(
      events.map(async (eachData) => {
        const availableSeats = await checkForSeats(
          eachData.capacity,
          eachData._id,
        );

        return {
          id: eachData._id,
          name: eachData.name,
          organizer: eachData.organizer,
          description: eachData.description,
          location: eachData.location,
          category: eachData.category,
          capacity: eachData.capacity,
          availableSeats,
          date: getDate(eachData.date),
        };
      }),
    );

    res.status(200).json({
      count: events.length,
      data,
    });
  } catch (err) {
    res.status(500).json({ error_msg: err.message });
  }
});

//cancel registration
router.delete("/cancel/:eventId", authorization, async (req, res) => {
  try {
    const { id } = req;
    const { eventId } = req.params;

    const response = await Registration.findOneAndDelete({
      user: id,
      event: eventId,
    });

    res.status(200).json({ response });
  } catch (err) {
    res.status(500).json({ error_msg: err.message });
  }
});

module.exports = router;
