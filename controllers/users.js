const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");

const BadRequestError = require("../errors/bad-request-err");
const UnauthorizedError = require("../errors/unauthorized-err");
const NotFoundError = require("../errors/not-found-err");
const ConflictError = require("../errors/conflict-err");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new BadRequestError("Email and password are required");
    }

    const user = await User.findByCredentials(email, password);

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    return res.json({ token });
  } catch (err) {
    if (err.name === "UnauthorizedError" || err.message === "Incorrect email or password") {
      return next(new UnauthorizedError("Invalid email or password"));
    }

    return next(err);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return res.json(user);
  } catch (err) {
    if (err.name === "CastError") {
      return next(new BadRequestError("Invalid user id format"));
    }
    return next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { name, email, password, avatar } = req.body;

    if (!password) {
      throw new BadRequestError("Password is required");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      avatar,
    });

    const response = user.toObject();
    delete response.password;

    return res.status(201).json(response);
  } catch (err) {
    if (err.code === 11000) {
      return next(new ConflictError("Email already exists"));
    }
    if (err.name === "ValidationError") {
      return next(new BadRequestError("Invalid data provided"));
    }
    return next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { name, avatar } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, avatar },
      { new: true, runValidators: true }
    );

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return res.json(user);
  } catch (err) {
    if (err.name === "ValidationError") {
      return next(new BadRequestError("Invalid data provided"));
    }
    if (err.name === "CastError") {
      return next(new BadRequestError("Invalid user id format"));
    }
    return next(err);
  }
};

module.exports = {
  login,
  createUser,
  getCurrentUser,
  updateUser,
};

