require('dotenv').config();

const mongoose = require("mongoose");

const connectMongoDB = () => {
  mongoose.connect(`${process.env.DB_HOST}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", console.log.bind(console, "Connected to database.."));
};

module.exports = connectMongoDB;