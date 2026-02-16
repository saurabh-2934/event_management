const mongoose = require("mongoose");
const Event = require("./models/event.model");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database connected for seeding"))
  .catch((err) => console.log(err));

const events = [
  {
    name: "Full Stack Developer Bootcamp",
    organizer: "CodeCraft Academy",
    location: "Bangalore, India",
    date: new Date("2026-04-15"),
    description:
      "An intensive 3-day bootcamp covering MERN stack, deployment, and real-world project building.",
    capacity: 150,
    category: "Tech",
  },
  {
    name: "AI & Machine Learning Summit",
    organizer: "TechVision India",
    location: "Hyderabad, India",
    date: new Date("2026-05-20"),
    description:
      "A summit focused on AI trends, deep learning, and real-world AI applications.",
    capacity: 300,
    category: "Tech",
  },
  {
    name: "Bollywood Night Live",
    organizer: "Rhythm Events",
    location: "Mumbai, India",
    date: new Date("2026-03-10"),
    description:
      "A live Bollywood music concert featuring popular singers and DJs.",
    capacity: 500,
    category: "Music",
  },
  {
    name: "Indie Music Fest",
    organizer: "SoundWave Productions",
    location: "Delhi, India",
    date: new Date("2026-06-18"),
    description:
      "An evening dedicated to independent artists and live band performances.",
    capacity: 350,
    category: "Music",
  },
  {
    name: "City Marathon 2026",
    organizer: "RunIndia Foundation",
    location: "Pune, India",
    date: new Date("2026-01-25"),
    description:
      "Annual marathon open for all age groups with exciting prizes.",
    capacity: 1000,
    category: "Sports",
  },
  {
    name: "Inter-College Football Championship",
    organizer: "Youth Sports League",
    location: "Chennai, India",
    date: new Date("2026-07-12"),
    description:
      "Football tournament featuring top college teams from across India.",
    capacity: 800,
    category: "Sports",
  },
  {
    name: "Startup Pitch Competition",
    organizer: "Entrepreneur Hub",
    location: "Ahmedabad, India",
    date: new Date("2026-02-28"),
    description:
      "A competition for startups to pitch their ideas to investors.",
    capacity: 200,
    category: "Business",
  },
  {
    name: "Digital Marketing Masterclass",
    organizer: "Growth Gurus",
    location: "Kolkata, India",
    date: new Date("2026-08-05"),
    description: "Learn SEO, social media marketing, and paid ads strategies.",
    capacity: 180,
    category: "Education",
  },
];

const seedData = async () => {
  try {
    await Event.deleteMany(); // clear old data
    await Event.insertMany(events);
    console.log("Seeding successful");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

seedData();
