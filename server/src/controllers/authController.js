import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/UserSchema.js";
import {
  loginValidationRules,
  signupValidationRules,
  validate,
} from "../middlewares/validators.js";

// First time user validation (to check user loggedIn or not)
export const validateLogin = async (req, res) => {
  try {
    if (req.user) {
      return res.status(200).json({
        _id: req.user._id,
        email: req.user.email,
        isAuthenticated: true,
        message: "User is logged in.",
      });
    } else {
      return res.status(401).json({
        isAuthenticated: false,
        message: "Unauthorized, please login",
      });
    }
  } catch (error) {
    console.log("validateLogin error", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

//* ************** User Login *************** *//
export const login = [
  ...loginValidationRules(),
  validate,
  async (req, res) => {
    const { email, password } = req.body;
    console.log("🚀 ~ req.body:", req.body);

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    try {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
    } catch (error) {
      console.log("Error comparing password", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    let accessToken;
    try {
      accessToken = jwt.sign(
        { _id: user._id, email: user.email },
        process.env.PRIVATE_KEY,
        { expiresIn: "12h" }
      );
    } catch (error) {
      console.log("Error login JWT", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    res.cookie("jwtoken", accessToken, {
      maxAge: 43200000, // 12 hr
      httpOnly: true,
      path: "/",
      sameSite: "none",
      secure: true,
    });

    return res.status(200).json({
      message: "Login Successfull",
      isSignedIn: true,
      _id: user.id,
      email: user.email,
      token: accessToken,
    });
  },
];

//* ************** User Signup *************** *//
export const signup = [
  ...signupValidationRules(),
  validate,
  async (req, res) => {
    const { name, email, password } = req.body;

    let existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(422).json({ message: "Email already in use" });
    }

    let hashedPassword = await bcrypt.hash(password, 12);

    let newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });

    try {
      await newUser.save();
    } catch (error) {
      console.log("🚀 newUser error:", error);
      return res
        .status(422)
        .json({ error: "Could not create new user, Please try again" });
    }

    const { id, name: userName, email: userEmail } = newUser;

    let accessToken;
    try {
      accessToken = jwt.sign(
        { _id: id, email: email },
        process.env.PRIVATE_KEY,
        { expiresIn: "12h" }
      );
    } catch (error) {
      console.log("Error login JWT", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    res.cookie("jwtoken", accessToken, {
      maxAge: 43200000,
      httpOnly: true,
      path: "/",
      sameSite: "none",
      secure: true,
    });

    return res.status(200).json({
      message: "Registration Successful",
      _id: id,
      name: userName,
      email: userEmail,
    });
  },
];

// Handle User Logout
export const logout = (req, res) => {
  res.clearCookie("jwtoken", {
    domain: process.env.CLIENT_DOMAIN_NAME,
    secure: true,
    sameSite: "none",
  });

  return res
    .status(200)
    .json({ isSignedIn: false, message: "sign out successfully" });
};
