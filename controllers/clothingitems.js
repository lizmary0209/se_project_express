const ClothingItem = require("../models/clothingitem");
const {
  BAD_REQUEST,
  NOT_FOUND,
  handleCastError,
  handleNotFound,
} = require("../utils/errors");

const getItems = async (req, res, next) => {
  try {
    const items = await ClothingItem.find({});
    res.json(items);
  } catch (err) {
    next(err);
  }
};

const createItem = async (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  try {
    const item = await ClothingItem.create({ name, weather, imageUrl, owner });
    res.status(201).json(item);
  } catch (err) {
    if (err.name === "ValidationError") {
      err.status = BAD_REQUEST;
      err.message = "Invalid data provided";
    }
    next(err);
  }
};

const deleteItem = async (req, res, next) => {
  const { id } = req.params;

  try {
    const item = await ClothingItem.findById(id).orFail(() => {
      const error = new Error("Item not found");
      error.status = NOT_FOUND;
      throw error;
    });

    if (String(item.owner) !== String(req.user._id)) {
      return res
        .status(403)
        .json({ message: "You cannot delete someone else's item" });
    }

    await item.deleteOne();
    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    handleCastError(err, "item");
    handleNotFound(err, "Item");
    next(err);
  }
};

const likeItem = async (req, res, next) => {
  const { id } = req.params;

  try {
    const item = await ClothingItem.findByIdAndUpdate(
      id,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    ).orFail(() => {
      const error = new Error("Item not found");
      error.status = NOT_FOUND;
      throw error;
    });

    res.json(item);
  } catch (err) {
    handleCastError(err, "item");
    handleNotFound(err, "Item");
    next(err);
  }
};

const dislikeItem = async (req, res, next) => {
  const { id } = req.params;

  try {
    const item = await ClothingItem.findByIdAndUpdate(
      id,
      { $pull: { likes: req.user._id } },
      { new: true }
    ).orFail(() => {
      const error = new Error("Item not found");
      error.status = NOT_FOUND;
      throw error;
    });

    res.json(item);
  } catch (err) {
    handleCastError(err, "item");
    handleNotFound(err, "Item");
    next(err);
  }
};

module.exports = {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
};
