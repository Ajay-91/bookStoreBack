require("dotenv").config(); //this configures the env.file to the application, the data inside the .env file  will be accessible throughout the application via global object.
require("./dbConfig");
const express = require("express");
const cors = require("cors");
const Router = require("./Routes");

const server = new express();
const port = 3000;

//middleware to allow resource sharing btw different origins
server.use(cors());

//middleware that can convert object to json (parse) and vice versa
server.use(express.json());

server.use("/uploads", express.static("./uploads"));

server.use(Router);

server.listen(port, () => {
  console.log("Server is listening to ", port);
});
