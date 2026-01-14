const userModel = require("../Models/userModel");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    let userName = req.body.userName;
    let password = req.body.password;
    let email = req.body.email;
    if (userName && password && email) {
      //register logic
      let existingUser = await userModel.findOne({ email: email });

      //if user details already exist
      if (existingUser) {
        res
          .status(409)
          .json({ message: "User with this email id is already registered." });
      } else {
        //create new user
        let newUser = new userModel({ userName, password, email });
        await newUser.save();
        res.status(201).json({ message: "Successfully Registered", newUser });
      }
    } else {
      //when fields are empty
      res.status(400).json({ message: "Please fill the fields" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong in server." });
  }
};

exports.loginUser = async (req, res) => {
  try {
    let email = req.body.email;

    let { password } = req.body;

    let existingUser = await userModel.findOne({ email: email });

    if (existingUser) {
      //login logic
      if (existingUser.password == password) {
        let payload = {
          userName: existingUser.userName,
          email: existingUser.email,
          userType: existingUser.userType,
        };

        let token = jwt.sign(payload, process.env.jwtSecretKey);

        res
          .status(200)
          .json({ message: "Login Successful.", token, existingUser });
      } else {
        res.status(400).json({ message: "Invalid password" });
      }
    } else {
      res
        .status(400)
        .json({ message: "User with this mail id does not exist." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong in server" });
  }
};

exports.googleLogin = async (req, res) => {
  try {
    let { email, userName, proPic } = req.body;

    let existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      //login logic
      if (existingUser.password == password) {
        let payload = {
          userName: existingUser.userName,
          email: existingUser.email,
          userType: existingUser.userType,
        };

        let token = jwt.sign(payload, process.env.jwtSecretKey);

        res
          .status(200)
          .json({ message: "Login Successful.", token, existingUser });
      } else {
        res.status(400).json({ message: "Invalid password" });
      }
    } else {
      //register logic
      let newUser = new userModel({
        userName,
        password: "googlePswd",
        proPic,
        email,
      });
      await newUser.save();

      //directly login
      let payload = {
        userName: newUser.userName,
        userType: newUser.userType,
        email: newUser.email,
      };
      let token = jwt.sign(payload, process.env.jwtSecretKey);
      res.status(201).json({ message: "Login Successful.", token });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong in server" });
  }
};
