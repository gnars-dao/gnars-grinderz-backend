const mongoose = require("mongoose");
const config = require("../config");

async function setup() {
  try {
    await mongoose.connect(
      `mongodb://${config.mongodb.username}:${config.mongodb.password}@${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.db}?authsource=admin`,
      {
        // user: config.mongodb.username,
        // pass: config.mongodb.password,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        autoIndex: true,
        bufferMaxEntries: 0,
        connectTimeoutMS: 10000,
        socketTimeoutMS: 45000,
      }
    );
    console.log("Mongo Connected.");
  } catch (error) {
    console.error("Mongo Error!", error);
    process.exit(1);
  }
}

module.exports = setup;
