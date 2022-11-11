const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/images", express.static(path.resolve(__dirname, "images")));
app.use("/users", require("./routes/users.route"));
app.use("/immovables", require("./routes/immovables.route"));
app.use("/comments", require("./routes/comments.route"));
app.use("/offers", require("./routes/offers.route"));

async function server(port) {
  try {
    await mongoose.connect(process.env.DB_URL.toString());
    console.log("Подключение к базе данных прошла успешна");
    app.listen(port, () => {
      console.log("сервер запущен");
    });
  } catch (error) {
    console.log("Ошибка при соединении с сервером ");
  }
}
server(Number(process.env.SERVER_PORT));
