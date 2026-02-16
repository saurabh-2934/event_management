const http = require("http");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT;
const app = express();
//DB connection
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDb connected successfully.");
  } catch (err) {
    console.error(`mongoDb connection failed: ${err.message}.`);
    process.exit(1);
  }
};

connectDb();

app.use(express.json());
app.use(cors());

// user routes
const userRoutes = require("./routes/user.route");
const eventRoutes = require("./routes/event.route");
const registerRoutes = require("./routes/registration.route");

app.use("/api", userRoutes);
app.use("/api", eventRoutes);
app.use("/api", registerRoutes);

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`server is listning on http://localhost:${PORT}`);
});
