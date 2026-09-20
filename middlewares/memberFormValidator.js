import { body } from "express-validator";

export const memberFormValidator = [
  body("code").trim().notEmpty().withMessage("Please input a code."),
];
