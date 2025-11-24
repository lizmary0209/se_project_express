const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const usersRouter = require("./routes/users");
const itemsRouter = require("./routes/clothingitems");

const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db").catch((err) => ({}));

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  if (!req.user) {
    req.user = { _id: "69238ae7fe791ebc0d74b671" };
  }
  next();
});

app.use("/users", usersRouter);
app.use("/items", itemsRouter);

app.use((req, res, next) => {
  res.status(404).json({ message: "Requested resource not found" });
});

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

app.listen(PORT);
