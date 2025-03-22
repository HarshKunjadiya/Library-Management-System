import IssuedBookDetails from "../database/models/issuedBook.js";
import Books from "../database/models/books.js";

export const getAllbook = async (req, res) => {
  try {
    let { search , page , limit } = req.body;
    page = page || 1,limit = limit || 10;
    const searchQuery = search ? new RegExp(search, "i") : "";
    if (searchQuery == "") {
      const Book = await Books.find();
      return res.status(200).json({ message: "book shown successfully", books: Book });  
    }
    const Book = await Books
      .find({$or:[{name:searchQuery},{author:searchQuery},{publisher:searchQuery}]})
      .skip((page - 1) * limit)
      .limit(limit); 
    return res.status(200).json({ message: "book shown successfully", books: Book });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ msaage: "internal server error" });
  }
};

export const addBook = async (req, res) => {
  try {
    const { name } = req.body;
    const verifyBook = await Books.findOne({ name });
    if (verifyBook) {
      return res.status(404).json({ message: "book already exits" });
    }
    const availabe_stock = req.body.total_stock;
    const issued_stock = 0;
    const book = await Books.create({
      ...req.body,
      availabe_stock,
      issued_stock,
    });
    return res.status(200).json({ message: "book added successfully", book });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ msaage: "internal server error" });
  }
};

export const issuedBook = async (req, res) => {
  try {
    const { bookId, userId } = req.body;
    const book = await IssuedBookDetails.findOne({ bookId, userId });
    if (book) {
      return res.status(404).json({ message: "book already issued to this student"});
    }
    const verifyBook = await Books.findById(bookId);
    if (!verifyBook) {
      return res.status(404).json({ message: "book not found" });
    }
    if (verifyBook.availabe_stock == 0) {
      return res.status(404).json({ message: "out of stock" });
    }
    const issuedBook = await IssuedBookDetails.create({
      ...req.body,
      issuseDate: Date.now(),
      status : "Issued",
    });
    let { availabe_stock, issued_stock } = verifyBook;
    verifyBook.availabe_stock = --availabe_stock;
    verifyBook.issued_stock = ++issued_stock;
    await verifyBook.save();
    return res
      .status(200)
      .json({ message: "book issued succeeffully", issuedBook });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ msaage: "internal server error" });
  }
};

export const returnBook = async (req, res) => {
  try {
    const { bookId, userId } = req.body;
    const verifyBook = await IssuedBookDetails.findOne({bookId,userId});
    if (!verifyBook) {
      return res.status(404).json({ message: "book not issued before" });
    }  
    verifyBook.status = "Returned";
    let { availabe_stock, issued_stock } = verifyBook;
    verifyBook.availabe_stock = ++availabe_stock;
    verifyBook.issued_stock = --issued_stock;
    await verifyBook.save();
    return res
      .status(200)
      .json({ message: "book return successfully", returnBook });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ msaage: "internal server error" });
  }
};

export const reIssueBook = async (req, res) => {
  try {
    const { bookId, userId, returnDate } = req.body;
    const book = await IssuedBookDetails.findOne({ bookId, userId });
    if (!book) {
      return res.status(404).json({ message: "book not issued before" });
    }
    const updatedBook = await book.updateOne({ returnDate });
    return res.status(200).json({ message: "book reissue successfully", updatedBook });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ msaage: "internal server error" });
  }
};

export const removeBook = async (req, res) => {
  try {
    const { bookId } = req.body;
    const verifyBook = await Books.findById(bookId);
    if (!verifyBook) {
      return res.status(404).json({ message: "book not found" });
    }
    if (verifyBook.availabe_stock != verifyBook.total_stock) {
      return res.status(404).json({ message: "book is issued" });
    }
    const removeBook = await Books.deleteOne({bookId});
    return res.status(200).json({ message: "book removed successfully",removeBook});
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "internal server error" });
  }
};

// export const getAll = async (req, res) => {
//   let { search, page, limit } = req.body;
//   page = page || 1, limit = limit || 10;
//   try {
//     const searchQuery = search ? new RegExp(search, "i") : "";

//     const response = await Books
//       .find({ name: { $regex: searchQuery } })
//       .skip((page - 1) * limit)
//       .limit(limit);

//     return res.status(200).json({ message: "Data found", response });
//   } catch (error) {
//     console.log(error);
//     return res.status(404).json({ message: "internal server error" });
//   }
// };
