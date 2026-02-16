const jwt = require("jsonwebtoken");

const authorize = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(400).json({ error_msg: "Token is missing." });
    }

    const jwtToken = authHeader.split(" ")[1];

    const decoded = jwt.verify(jwtToken, process.env.MY_SECRET);
    req.id = decoded.id;

    next();
  } catch (err) {
    res.status(500).json({ error_msg: err.message });
  }
};

module.exports = authorize;
