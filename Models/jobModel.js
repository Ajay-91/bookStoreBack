const mongoose = require("mongoose");
const jobSchema = mongoose.Schema({
  jobId: {
    type: String,
    required: true,
    unique: true,
  },
  jobDesc: {
    type: String,
    required: true,
  },
  jobRole: {
    type: String,
    required: true,
  },
  publishedDate: {
    type: String,
    required: true,
  },
  lastDate: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
});

const jobModel = new mongoose.model("jobs", jobSchema);
module.exports = jobModel;
