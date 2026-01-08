const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const itemsRouter = require("./routes/clothingitems");
const NotFoundError = require("./errors/not-found-err");
const errorHandler = require("./middlewares/error-handler");



const { PORT = 3001 } = process.env;
const app = express();

if (process.env.NODE_ENV !== "test") {
  mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db").catch(() => {});
}

app.use(cors());
app.use(express.json());

app.use("/", authRouter);
app.use("/users", usersRouter);
app.use("/items", itemsRouter);


app.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

app.use(errorHandler);


if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}

module.exports = app;
