const express = require("express");
const Event = require("../models/event.model");
const Registration = require("../models/registration.model");
const authorization = require("../middleware/chech_auth");
const { format } = require("date-fns");

const router = express.Router();

//date formatter
const getDate = (date) => {
  return format(new Date(date), "dd-MM-yyyy");
};

const checkForSeats = async (capacity, eventId) => {
  const eventCount = await Registration.countDocuments({
    event: eventId,
  });

  return capacity - eventCount;
};

//get all events
router.get("/events", authorization, async (req, res) => {
  try {
    const { search, location, category } = req.query;

    let filter = {};

    // Text Search (on name & description)
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Filter by Location
    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    // Filter by Category
    if (category) {
      filter.category = { $regex: category, $options: "i" };
    }

    const events = await Event.find(filter);

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

//get events by id
router.get("/event/:eventId", authorization, async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(400).json({ error_msg: "event not found" });
    }

    const data = {
      id: event._id,
      name: event.name,
      description: event.description,
      organizer: event.organizer,
      location: event.location,
      capacity: event.capacity,
      category: event.category,
      date: getDate(event.date),
    };

    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ error_msg: err.message });
  }
});

module.exports = router;
