const User = require("../models/User");
const { BAD_REQUEST, NOT_FOUND, SERVER_ERROR } = require("../utils/errors.js");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.json(users);
  } catch (err) {
    return res
      .status(SERVER_ERROR)
      .json({ message: "An error has occurred on the server" });
  }
};

const getUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).orFail(() => {
      const error = new Error("User not found");
      error.statusCode = NOT_FOUND;
      throw error;
    });
    return res.json(user);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(BAD_REQUEST).json({ message: "Invalid user ID" });
    }

    if (err.name === "DocumentNotFoundError" || err.statusCode === NOT_FOUND) {
      return res.status(NOT_FOUND).json({ message: err.message });
    }

    return res
      .status(SERVER_ERROR)
      .json({ message: "An error has occurred on the server" });
  }
};

const createUser = async (req, res) => {
  const { name, avatar } = req.body;
  try {
    const user = await User.create({ name, avatar });
    return res.status(201).json(user);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(BAD_REQUEST).json({ message: "Invalid data provided" });
    }

    return res
      .status(SERVER_ERROR)
      .json({ message: "An error has occurred on the server" });
  }
};

module.exports = { getUsers, getUser, createUser };
