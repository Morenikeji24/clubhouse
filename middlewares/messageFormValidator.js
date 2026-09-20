import { body } from "express-validator";

export const messageFormValidator = [
  body("title").trim().notEmpty().withMessage("Please write a title."),

  body("text").trim().notEmpty().withMessage("Please Leave a message."),
];
