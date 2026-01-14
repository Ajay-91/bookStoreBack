const userModel = require("../Models/userModel");

exports.getUserDetails = async (req, res) => {
  try {
    let email = req.user;

    let userDetails = await userModel.findOne({ email: email });

    res.status(200).json(userDetails);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong in the server." });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    //we will get the id of the document(user) from the params
    let { id } = req.params;
    let { userName, password, userBio } = req.body;
    let proPic = req.file.filename;
    let userDetails = await userModel.findByIdAndUpdate(
      { _id: id },
      { userName, password, proPic, userBio },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "user Details updated successfully.", userDetails });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong in the server." });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    let allUsers = await userModel
      .find({ userType: { $ne: "admin" } })
      .select("-password");
    res.status(200).json(allUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong in the server." });
  }
};
