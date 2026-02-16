const express = require("express");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

const router = express.Router();

const userValidationSchema = Joi.object({
  name: Joi.string().trim().min(3).max(50).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters",
    "string.max": "Name cannot exceed 50 characters",
  }),

  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Please enter a valid email",
  }),

  password: Joi.string().min(6).max(20).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters",
    "string.max": "Password cannot exceed 20 characters",
  }),
});

const loginValidationSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Please enter a valid email",
  }),
  password: Joi.string().min(6).max(20).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters",
    "string.max": "Password cannot exceed 20 characters",
  }),
});

//register a User
router.post("/register", async (req, res) => {
  try {
    const { error, value } = userValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        error_msg: error.details[0].message,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(value.password, salt);
    await User.create({
      ...value,
      password: hashedPass,
    });

    res.status(200).json({ message: "User registered successfully!" });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        error_msg: "Email already registered. try different.",
      });
    }

    res.status(500).json({
      success: false,
      error_msg: "Something went wrong",
    });
  }
});

//login user
router.post("/login", async (req, res) => {
  try {
    const { error, value } = loginValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        error_msg: error.details[0].message,
      });
    }

    const user = await User.findOne({ email: value.email });
    if (!user) {
      return res.status(400).json({
        error_msg: "User does not exists",
      });
    }

    const passwordMatched = await bcrypt.compare(value.password, user.password);

    if (!passwordMatched) {
      return res.status(400).json({
        error_msg: "password not matched!",
      });
    }

    const payload = {
      id: user._id,
    };
    const jwtToken = jwt.sign(payload, process.env.MY_SECRET, {
      expiresIn: "1d",
    });

    const loggedUser = {
      id: user._id,
      name: user.name,
      email: user.email,
    };
    res.status(200).json({
      success: true,
      message: "login successful.",
      jwtToken,
      user: loggedUser,
    });
  } catch (err) {
    res.status(500).json({ error_msg: err.message });
  }
});

module.exports = router;
