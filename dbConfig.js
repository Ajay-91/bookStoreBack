//a file to configure databs and node.js

//import mongoose
const mongoose = require("mongoose");

//mongoose-connect using connection string
//added the project name in between 
mongoose
  .connect(process.env.connectionString)
  .then((res) => {
    console.log("connected to mongoose");
  })
  .catch((err) => {
    console.log(err);
  });
