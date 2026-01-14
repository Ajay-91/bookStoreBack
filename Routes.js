const express = require("express");
const authController = require("./Controller/authController");
const bookController = require("./Controller/bookController");
const jwtMiddleware = require("./middlewares/jwtMiddleware");
const multerConfig = require("./middlewares/multerMiddleware");
const userController = require("./Controller/userController");
const jwtAdminMiddleware = require("./middlewares/jwtAdminMiddleware");
const jobController = require("./Controller/jobController");
const applicationController = require("./Controller/applicationController");
const resumeMulterConfig = require("./middlewares/resumeMulterMiddleware");
const purchaseController = require("./Controller/purchaseController");

const Router = new express.Router();

Router.post("/registerUser", authController.registerUser);

Router.post("/loginUser", authController.loginUser);

Router.post("/googleLogin", authController.googleLogin);

Router.post(
  "/addBook",
  jwtMiddleware,
  multerConfig.array("uploadedImages"),
  bookController.addBookController
);

Router.get("/getAllBooks", jwtMiddleware, bookController.getAllBookController);

Router.get("/getSampleBooks", bookController.getSampleBookController);

Router.get("/userDetails", jwtMiddleware, userController.getUserDetails);

Router.get(
  "/getSingleBook/:id",
  jwtMiddleware,
  bookController.getSingleBookController
);

Router.patch(
  "/:id/updateProfile",
  jwtMiddleware,
  multerConfig.single("proPic"),
  userController.updateProfile
);

Router.get("/getAllUsers", jwtAdminMiddleware, userController.getAllUsers);

Router.post("/addJob", jwtAdminMiddleware, jobController.addJob);
Router.get("/getAllJobs", jobController.getJobs);
Router.delete("/:id/deleteJob", jwtAdminMiddleware, jobController.deleteJob);

Router.post(
  "/applyJob",
  resumeMulterConfig.single("resume"),
  applicationController.applyJob
);

Router.get(
  "/getAllApplications",
  jwtAdminMiddleware,
  applicationController.getAllApplications
);

Router.post(
  "/buyBook",
  jwtMiddleware,
  purchaseController.purchaseDetails
);

module.exports = Router;
