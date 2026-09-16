import { validationResult } from "express-validator";
import db from "../db/queries.js";
import bcrypt from "bcryptjs";

const controller = {
  async getHomePage(req, res) {
    res.render("index");
  },

  async getSignUp(req, res) {
    res.render("sign-up");
  },

  async postSignUp(req, res) {
    const errors = validationResult(req);
    const { firstname, lastname, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    if (!errors.isEmpty()) {
      return res.status(400).render("sign-up", { errors: errors.array() });
    }

    await db.createUser(firstname, lastname, username, hashedPassword);

    res.redirect("/");
  },
};

export default controller;
