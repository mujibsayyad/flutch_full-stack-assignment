import { Router } from "express";
import {
  login,
  signup,
  logout,
  validateLogin,
} from "../controllers/authController.js";
import isAuthenticate from "../middlewares/isAuth.js";

const router = Router();

router.get("/validate", isAuthenticate, validateLogin);

router.post("/login", login);

router.post("/authenticate/facebook/", login);

router.post("/signup", signup);

router.post("/logout", logout);

export default router;
