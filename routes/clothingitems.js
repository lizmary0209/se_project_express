const router = require("express").Router();

const auth = require("../middlewares/auth");


const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingitems");

const { validateItemBody, validateId } = require("../middlewares/validation");

router.get("/", getItems);
router.post("/", auth, validateItemBody, createItem);
router.delete("/:id", auth, validateId, deleteItem);
router.put("/:id/likes", auth, validateId, likeItem);
router.delete("/:id/likes", auth, validateId, dislikeItem);

module.exports = router;
