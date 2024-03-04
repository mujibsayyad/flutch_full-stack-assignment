import { check, validationResult } from "express-validator";

// login validation rules
export const loginValidationRules = () => {
  return [
    check("email")
      .trim()
      .normalizeEmail()
      .isEmail()
      .withMessage("Please enter a valid email address"),

    check("password")
      .trim()
      .customSanitizer((value) => {
        return value.replace(/\s+/g, "");
      }),
  ];
};

// signup validation rules
export const signupValidationRules = () => {
  return [
    check("name")
      .notEmpty()
      .trim()
      .escape()
      .isString()
      .withMessage("Name is required"),

    check("email")
      .trim()
      .normalizeEmail()
      .isEmail()
      .withMessage("Provide a valid email address"),

    check("password")
      .trim()
      .customSanitizer((value) => {
        return value.replace(/\s+/g, "");
      })
      .isLength({ min: 5 })
      .withMessage("Password must be at least 6 characters long"),
  ];
};

export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
