const ClothingItem = require("../models/clothingitem");
const {
  BAD_REQUEST,
  NOT_FOUND,
  handleCastError,
  handleNotFound,
} = require("../utils/errors");

module.exports.getItems = async (req, res, next) => {
  try {
    const items = await ClothingItem.find({});
    res.send(items);
  } catch (err) {
    next(err);
  }
};

module.exports.createItem = async (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  try {
    const item = await ClothingItem.create({ name, weather, imageUrl, owner });
    res.status(201).send(item);
  } catch (err) {
    if (err.name === "ValidationError") {
      err.status = BAD_REQUEST;
    }
    next(err);
  }
};

module.exports.deleteItem = async (req, res, next) => {
  const { id } = req.params;

  try {
    const item = await ClothingItem.findById(id).orFail(() => {
      const error = new Error("Item not found");
      error.status = NOT_FOUND;
      throw error;
    });

    if (String(item.owner) !== String(req.user._id)) {
      const error = new Error("You cannot delete someone else's item");
      error.status = 403;
      throw error;
    }

    await item.deleteOne();
    res.send({ message: "Item deleted successfully" });
  } catch (err) {
    handleCastError(err, "item");
    handleNotFound(err, "Item");
    next(err);
  }
};

module.exports.likeItem = async (req, res, next) => {
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

    res.send(item);
  } catch (err) {
    handleCastError(err, "item");
    handleNotFound(err, "Item");
    next(err);
  }
};

module.exports.dislikeItem = async (req, res, next) => {
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

    res.send(item);
  } catch (err) {
    handleCastError(err, "item");
    handleNotFound(err, "Item");
    next(err);
  }
};
