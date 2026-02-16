const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    organizer: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: Date,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    capacity: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: ["Music", "Tech", "Sports", "Education", "Business", "Other"],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Event", eventSchema);
