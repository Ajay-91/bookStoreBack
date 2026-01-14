const applicationModel = require("../Models/applicationModel");

exports.applyJob = async (req, res) => {
  try {
    let { fullName, phoneNo, email, jobId, jobTitle } = req.body;
    let resume = req.file.filename;
    let existingUser = await applicationModel.findOne({ email, jobId });
    if (existingUser) {
      res.status(409).json({ message: "Already applied to this job Role" });
    } else {
      //apply
      let newApplication = new applicationModel({
        fullName,
        phoneNo,
        email,
        jobId,
        jobTitle,
        resume,
      });
      await newApplication.save();
      res.status(201).json({ message: "Successfully applied" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something went wrong in the server" });
  }
};

exports.getAllApplications = async (req, res) => {
  try {
    let allApplications = await applicationModel.find();
    res.status(200).json(allApplications);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something went wrong in the server"});
  }
};
