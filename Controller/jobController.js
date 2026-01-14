const jobModel = require("../Models/jobModel");

exports.addJob = async (req, res) => {
  try {
    let {
      jobId,
      jobRole,
      jobDesc,
      publishedDate,
      lastDate,
      salary,
      experience,
    } = req.body;

    let newJob = new jobModel({
      jobId,
      jobRole,
      jobDesc,
      publishedDate,
      lastDate,
      salary,
      experience,
    });
    await newJob.save();
    res.status(201).json({ message: "Added successfully", newJob });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong in the server." });
  }
};

exports.getJobs = async (req, res) => {
  try {
    let allJobs = await jobModel.find();
    res.status(200).json({ allJobs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong in the server." });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    let { id } = req.params;
    let deleteJob = await jobModel.findByIdAndDelete({ _id: id });
    res.status(200).json({ message: "Successfully deleted." },deleteJob);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong in the server." });
  }
};
