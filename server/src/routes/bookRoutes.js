import { Router } from "express";
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  searchBooks,
} from "../controllers/bookController.js";

import isAuthenticate from "../middlewares/isAuth.js";

const router = Router();

router.use(isAuthenticate);

router.get("/getallbooks", getAllBooks);

router.get("/getbook/:id", getBookById);

router.post("/createbook", createBook);

router.put("/updatebook/:id", updateBook);

router.delete("/deletebook/:id", deleteBook);

router.get("/searchbooks", searchBooks);

export default router;
