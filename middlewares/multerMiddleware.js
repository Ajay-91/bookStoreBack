const multer = require("multer");

//storage:
const storage = multer.diskStorage({
  //location to store files
  //multer fns have 3 arg, request, file and callback fn
  //we describe the operations  inside the callback
  destination: (req, file, callBack) => {
    callBack(null, "./uploads");
  },

  //modify the filename
  filename: (req, file, callBack) => {
    let date = Date.now();
    callBack(null, `Bookstore-${date}-${file.originalname}`);
  },
});

//file filter- to filter acc to size,type,etc

const fileFilter = (req, file, callBack) => {
  //mimetype means file type (pdf,doc,png,jpeg,etc)
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/jgp"
  ) {
    callBack(null, true);
    //proceed to save
  } else {
    callBack(null, false);
    //return error
  }
};

const multerConfig = multer({ storage, fileFilter });

module.exports = multerConfig;
