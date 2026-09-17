import { body } from "express-validator";

export const loginFormValidator = [
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
];
