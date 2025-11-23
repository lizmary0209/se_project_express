const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const usersRouter = require("./routes/users");
const itemsRouter = require("./routes/clothingitems");
const auth = require("./middlewares/auth");
const errorHandler = require("./middlewares/errors");

const { NOT_FOUND } = require("./utils/errors");

const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db").catch(() => {});

app.use(cors());
app.use(express.json());

app.use("/users", usersRouter);
app.use("/items", auth, itemsRouter);

app.use((req, res) => {
  res.status(NOT_FOUND).json({ message: "Requested resource not found" });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
