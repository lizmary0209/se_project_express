const ClothingItem = require("../models/clothingitem");
const BadRequestError = require("../errors/bad-request-err");
const ForbiddenError = require("../errors/forbidden-err");
const NotFoundError = require("../errors/not-found-err");


const getItems = async (req, res, next) => {
  try {
    const items = await ClothingItem.find({});
    return res.json(items);
  } catch (err) {
    return next(err);
  }
};

const createItem = async (req, res, next) => {
  try {
    const { name, weather, imageUrl } = req.body;
    const owner = req.user._id;

    const item = await ClothingItem.create({ name, weather, imageUrl, owner });

    return res.status(201).json(item);
  } catch (err) {
    if (err.name === "ValidationError") {
      return next(new BadRequestError("Invalid data provided"));
    }
    return next(err);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    const item = await ClothingItem.findById(id);

    if (!item) {
      throw new NotFoundError("Item not found");
    }

    if (String(item.owner) !== String(req.user._id)) {
      throw new ForbiddenError("You cannot delete someone else's item");
    }

    await item.deleteOne();

    return res.json({ message: "Item deleted successfully" });
  } catch (err) {
    if (err.name === "CastError") {
      return next(new BadRequestError("Invalid item id format"));
    }
    return next(err);
  }
};

const likeItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    const item = await ClothingItem.findByIdAndUpdate(
      id,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    );

    if (!item) {
      throw new NotFoundError("Item not found");
    }

    return res.json(item);
  } catch (err) {
    if (err.name === "CastError") {
      return next(new BadRequestError("Invalid item id format"));
    }
    return next(err);
  }
};

const dislikeItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    const item = await ClothingItem.findByIdAndUpdate(
      id,
      { $pull: { likes: req.user._id } },
      { new: true }
    );

    if (!item) {
      throw new NotFoundError("Item not found");
    }

    return res.json(item);
  } catch (err) {
    if (err.name === "CastError") {
      return next(new BadRequestError("Invalid item id format"));
    }
    return next(err);
  }
};

module.exports = {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
};