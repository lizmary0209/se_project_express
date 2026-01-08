const router = require("express").Router();


const { login, createUser } = require("../controllers/users");

const {
  validateUserBody,
  validateLogin,
} = require("../middlewares/validation");

router.post("/signup", validateUserBody, createUser);
router.post("/signin", validateLogin, login);

module.exports = router;
