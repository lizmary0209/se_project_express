const express = require("express");
const mongoose = require("mongoose");

const usersRouter = require("./routes/users");
const itemsRouter = require("./routes/clothingitems");

const { PORT = 3001 } = process.env;
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "690ef1fc1f073d04ef32af6a",
  };
  next();
});

app.use("/users", usersRouter);
app.use("/items", itemsRouter);

app.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
