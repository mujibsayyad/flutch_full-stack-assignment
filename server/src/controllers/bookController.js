import Book from "../models/BookStoreSchema.js";

// Get all books with pagination and count
export const getAllBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 6;
    const skip = (page - 1) * limit;
    const sortField = req.query.sort || "updatedAt";
    const sortOrder = sortField === "updatedAt" ? -1 : 1;

    const [books, totalBooks] = await Promise.all([
      Book.find()
        .sort({ [sortField]: sortOrder })
        .skip(skip)
        .limit(limit),
      Book.countDocuments(),
    ]);

    res.json({ books, totalBooks });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Find a book by ID
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (book == null) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Create a new book
export const createBook = async (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    user: req.user._id,
  });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update book data
export const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    // Check if the user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Check if the user has permission to update the book
    if (book.user.toString() !== req.user._id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    if (book === null) {
      return res.status(404).json({ message: "Book not found" });
    }
    if (req.body.title !== null) {
      book.title = req.body.title;
    }
    if (req.body.author !== null) {
      book.author = req.body.author;
    }
    if (req.body.description !== null) {
      book.description = req.body.description;
    }
    const updatedBook = await book.save();

    res.json(updatedBook);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Delete book by ID
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (book === null) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Check if the user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (book.user.toString() !== req.user._id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Search books by author name and book name
export const searchBooks = async (req, res) => {
  try {
    const search = req.query.search;
    const books = await Book.find({
      $or: [
        { title: { $regex: search, $options: "i" } }, // Search by book title
        { author: { $regex: search, $options: "i" } }, // Search by author name
      ],
    });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
