const express = require("express");
const {
  createUser,
  login,
  getCurrentUser,
  updateUser,
} = require("../controllers/users");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/signup", createUser);
router.post("/signin", login);
router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, updateUser);

module.exports = router;
