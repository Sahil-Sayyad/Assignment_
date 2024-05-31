// import mongoose package for connecting to server.
const mongoose = require("mongoose");

//sets up the mongodb  url
MongoURL = process.env.MONGO_URL;

//connect  app to mongodb
mongoose
  .connect(MongoURL)
  .then(() => console.log("DB Connected Sucessfully"))
  .catch((err) => console.log(`Connetion Error in Mongodb ${err}`));
