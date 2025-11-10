const ClothingItem = require("../models/clothingitem");
const { BAD_REQUEST, NOT_FOUND, SERVER_ERROR } = require("../utils/errors");

const getItems = async (req, res) => {
  try {
    const items = await ClothingItem.find({});
    return res.json(items);
  } catch (err) {
    return res
      .status(SERVER_ERROR)
      .json({ message: "An error has occurred on the server" });
  }
};

const createItem = async (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  if (!owner) {
    return res
      .status(BAD_REQUEST)
      .json({ message: "User information is missing" });
  }

  try {
    const item = await ClothingItem.create({ name, weather, imageUrl, owner });
    return res.status(201).json(item);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(BAD_REQUEST).json({ message: "Invalid data provided" });
    }

    return res
      .status(SERVER_ERROR)
      .json({ message: "An error has occurred on the server" });
  }
};

const deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await ClothingItem.findByIdAndDelete(id).orFail(() => {
      const error = new Error("Item not found");
      error.status = NOT_FOUND;
      throw error;
    });

    await item.deleteOne();
    return res.json({ message: "Item deleted successfully" });
  } catch (err) {
    if (err.name === "DocumentNotFoundError" || err.status === NOT_FOUND) {
      return res.status(NOT_FOUND).json({ message: "Item not found" });
    }

    if (err.name === "CastError") {
      return res.status(BAD_REQUEST).json({ message: "Invalid data" });
    }

    return res
      .status(SERVER_ERROR)
      .json({ message: "An error has occurred on the server" });
  }
};

const likeItem = async (req, res) => {
  try {
    const item = await ClothingItem.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likes: req.user._id } },
      { new: true, runValidators: true }
    ).orFail(() => {
      const error = new Error("Item not found");
      error.status = NOT_FOUND;
      throw error;
    });

    return res.json(item);
  } catch (err) {
    if (err.name === "DocumentNotFoundError" || err.status === NOT_FOUND) {
      return res.status(NOT_FOUND).json({ message: err.message });
    }

    if (err.name === "CastError") {
      return res.status(BAD_REQUEST).json({ message: "Invalid item ID" });
    }

    return res
      .status(SERVER_ERROR)
      .json({ message: "An error has occurred on the server" });
  }
};

const dislikeItem = async (req, res) => {
  try {
    const item = await ClothingItem.findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: req.user._id } },
      { new: true, runValidators: true }
    ).orFail(() => {
      const error = new Error("Item not found");
      error.status = NOT_FOUND;
      throw error;
    });

    return res.json(item);
  } catch (err) {
    if (err.name === "DocumentNotFoundError" || err.status === NOT_FOUND) {
      return res.status(NOT_FOUND).json({ message: err.message });
    }

    if (err.name === "CastError") {
      return res.status(BAD_REQUEST).json({ message: "Invalid item ID" });
    }

    return res
      .status(SERVER_ERROR)
      .json({ message: "An error has occurred on the server" });
  }
};

module.exports = { getItems, createItem, deleteItem, likeItem, dislikeItem };
