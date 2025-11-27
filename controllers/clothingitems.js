const ClothingItem = require("../models/clothingitem");
const {
  BAD_REQUEST,
  NOT_FOUND,
  FORBIDDEN,
  handleCastError,
  handleNotFound,
} = require("../utils/errors");

const getItems = async (req, res, next) => {
  try {
    const items = await ClothingItem.find({});
    return res.json(items);
  } catch (err) {
    return next(err);
  }
};

const createItem = async (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  try {
    const item = await ClothingItem.create({ name, weather, imageUrl, owner });
    return res.status(201).json(item);
  } catch (err) {
    if (err.name === "ValidationError") {
      err.status = BAD_REQUEST;
      err.message = "Invalid data provided";
    }
    return next(err);
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
        .status(FORBIDDEN)
        .json({ message: "You cannot delete someone else's item" });
    }

    await item.deleteOne();
    return res.json({ message: "Item deleted successfully" });
  } catch (err) {
    return next(
      handleCastError(err, "item") || handleNotFound(err, "Item") || err
    );
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

    return res.json(item);
  } catch (err) {
    return next(
      handleCastError(err, "item") || handleNotFound(err, "Item") || err
    );
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

    return res.json(item);
  } catch (err) {
    return next(
      handleCastError(err, "item") || handleNotFound(err, "Item") || err
    );
  }
};

module.exports = {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
};
