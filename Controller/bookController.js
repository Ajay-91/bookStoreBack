const bookModel = require("../Models/bookModel");

exports.addBookController = async (req, res) => {
  console.log(req.user);
  try {
    let = {
      title,
      author,
      noOfPages,
      imgURL,
      price,
      discountPrice,
      abstract,
      publisher,
      language,
      ISBN,
      category,
      uploadedImages,
      //uploadedImages : files that are uploaded will only be available at req.files
    } = req.body;

    let imageArray = [];

    req.files.forEach((eachFile) => imageArray.push(eachFile.filename));

    //userMail comes from token, we  decode the token in the middleware and updates the request( add a new key named user and its value as well)
    let userMail = req.user;

    if (
      title &&
      author &&
      noOfPages &&
      imgURL &&
      price &&
      discountPrice &&
      abstract &&
      publisher &&
      language &&
      ISBN &&
      category &&
      imageArray
    ) {
      //proceed to data

      //find returns array even if there is  no elements
      let existingBook = await bookModel.findOne({ title: title });
      if (existingBook) {
        res.status(409),
          json({ message: "Book with this title already exists." });
      } else {
        let newBook = new bookModel({
          title,
          author,
          noOfPages,
          imgURL,
          price,
          discountPrice,
          abstract,
          publisher,
          language,
          ISBN,
          category,
          uploadedImages: imageArray,
          userMail,
        });

        await newBook.save();
        res.status(201).json({ message: "Book Successfully Added", newBook });
      }
    } else {
      res.status(400).json({ messsage: "Fields are empty!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong in the server." });
  }
};

exports.getAllBookController = async (req, res) => {
  try {
    let searchKey = req.query.search;

    let query = {
      title: {
        $regex: searchKey,
        $options: "i",
      },
    };

    let bookData = await bookModel.find(query);
    res.status(200).json({ message: "Data successfully fetched.", bookData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong in the server" });
  }
};

exports.getSampleBookController = async (req, res) => {
  try {
    let SampleBooks = await bookModel.find().limit(6);
    res
      .status(200)
      .json({ message: "Data successfully fetched.", SampleBooks });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong in the server" });
  }
};

exports.getSingleBookController = async (req, res) => {
  try {
    let id = req.params.id;
    let singleBook = await bookModel.findById({ _id: id });
    res.status(200).json({ singleBook });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong in the server" });
  }
};
