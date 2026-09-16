import { body, validationResult, matchedData } from "express-validator";

export const validateForm = [
  body("firstname")
    .trim()
    .notEmpty()
    .withMessage("Please fill in your first name")
    .isAlpha()
    .withMessage("First name must only be letters"),

  body("lastname")
    .trim()
    .notEmpty()
    .withMessage("Please fill in your last name")
    .isAlpha()
    .withMessage("Last name must only be letters"),

  body("username")
    .trim()
    .notEmpty()
    .withMessage("Please fill in your username")
    .isAlphanumeric()
    .withMessage("Username must only contain letters and numbers"),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),

  body("password2")
    .notEmpty()
    .withMessage("Please confirm your password")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
];
