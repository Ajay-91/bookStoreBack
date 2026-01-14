const jwt = require("jsonwebtoken");

const jwtAdminMiddleware = (req, res, next) => {
  //token is passed from client to server  via authorization key in request header

  //we use bearer token here, so we need to remove keyword and seperate token from it
  //since it is a string, we converted it into array using split method

  //we get toke from 1st
  let token = req.headers.authorization.split(" ")[1];

  try {
    if (token) {
      let decodeData = jwt.verify(token, process.env.jwtSecretKey);
      console.log(decodeData)
      if (decodeData) {
        //next and upd res
        if (decodeData.userType == "admin") {
          req.user = decodeData.email;
          next();
        } else {
          res
            .status(403)
            .json({ message: "This operation can only be done by admin" });
        }
      } else {
        res.status(401).json({ message: "Invalid Token, Please Login" });
      }
    } else {
      res.status(401).json({ message: "Token is Required, Please Login" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something went wrong while validating token" });
  }
};

module.exports = jwtAdminMiddleware;
