const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const {
  BAD_REQUEST,
  NOT_FOUND,
  UNAUTHORIZED,
  CONFLICT,
} = require("../utils/errors");

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token });
  } catch (err) {
    err.status = UNAUTHORIZED;
    err.message = "Invalid email or password";
    next(err);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).orFail(() => {
      const error = new Error("User not found");
      error.status = NOT_FOUND;
      throw error;
    });
    res.json(user);
  } catch (err) {
    if (err.name === "CastError") {
      err.status = BAD_REQUEST;
      err.message = "Invalid user ID";
    }
    next(err);
  }
};

const createUser = async (req, res, next) => {
  const { name, email, password, avatar } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      avatar,
    });

    const response = user.toObject();
    delete response.password;

    res.status(201).json(response);
  } catch (err) {
    if (err.name === "ValidationError") {
      err.status = BAD_REQUEST;
      err.message = "Invalid data provided";
    } else if (err.code === 11000) {
      err.status = CONFLICT;
      err.message = "Email already exists";
    }
    next(err);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).orFail(() => {
      const error = new Error("User not found");
      error.status = NOT_FOUND;
      throw error;
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  const { name, avatar } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, avatar },
      { new: true, runValidators: true }
    ).orFail(() => {
      const error = new Error("User not found");
      error.status = NOT_FOUND;
      throw error;
    });

    res.json(user);
  } catch (err) {
    if (err.name === "ValidationError") {
      err.status = BAD_REQUEST;
      err.message = "Invalid data";
    }
    next(err);
  }
};

module.exports = {
  login,
  getUsers,
  getUser,
  createUser,
  getCurrentUser,
  updateUser,
};
