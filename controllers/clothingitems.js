const ClothingItem = require("../models/ClothingItem");
const { BAD_REQUEST, NOT_FOUND, SERVER_ERROR } = require("../utils/errors");

const getItems = async (req, res) => {
  try {
    const items = await ClothingItem.find({});
    res.json(items);
  } catch (err) {
    console.error(err);
    res
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
    res.status(201).json(item);
  } catch (err) {
    console.error(err);

    if (err.name === "ValidationError") {
      return res.status(BAD_REQUEST).json({ message: "Invalid data provided" });
    }

    res
      .status(SERVER_ERROR)
      .json({ message: "An error has occurred on the server" });
  }
};

const deleteItem = async (req, res) => {
  const { itemId } = req.params;
  try {
    const item = await ClothingItem.findByIdAndDelete(itemId).orFail(() => {
      const error = new Error("Item not found");
      error.status = NOT_FOUND;
      throw error;
    });

    await item.deleteOne();
    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    console.error(err);

    if (err.name === "DocumentNotFoundError" || err.status === NOT_FOUND) {
      return res.status(NOT_FOUND).json({ message: err.message });
    }

    if (err.name === "CastError") {
      return res.status(BAD_REQUEST).json({ message: "Invalid item ID" });
    }

    res
      .status(SERVER_ERROR)
      .json({ message: "An error has occurred on the server" });
  }
};

const likeItem = async (req, res) => {
  try {
    const item = await ClothingItem.findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { likes: req.user._id } },
      { new: true, runValidators: true }
    ).orFail(() => {
      const error = new Error("Item not found");
      error.status = NOT_FOUND;
      throw error;
    });

    res.json(item);
  } catch (err) {
    console.error(err);

    if (err.name === "DocumentNotFoundError" || err.status === NOT_FOUND) {
      return res.status(NOT_FOUND).json({ message: err.message });
    }

    if (err.name === "CastError") {
      return res.status(BAD_REQUEST).json({ message: "Invalid item ID" });
    }

    res
      .status(SERVER_ERROR)
      .json({ message: "An error has occurred on the server" });
  }
};

const dislikeItem = async (req, res) => {
  try {
    const item = await ClothingItem.findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } },
      { new: true, runValidators: true }
    ).orFail(() => {
      const error = new Error("Item not found");
      error.status = NOT_FOUND;
      throw error;
    });

    res.json(item);
  } catch (err) {
    console.error(err);

    if (err.name === "DocumentNotFoundError" || err.status === NOT_FOUND) {
      return res.status(NOT_FOUND).json({ message: err.message });
    }

    if (err.name === "CastError") {
      return res.status(BAD_REQUEST).json({ message: "Invalid item ID" });
    }

    res
      .status(SERVER_ERROR)
      .json({ message: "An error has occurred on the server" });
  }
};

module.exports = { getItems, createItem, deleteItem, likeItem, dislikeItem };
