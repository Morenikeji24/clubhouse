import { validationResult } from "express-validator";
import db from "../db/queries.js";
import bcrypt from "bcryptjs";
import passport from "passport";

const controller = {
  async getHomePage(req, res) {
    const messages = await db.getAllMessages();
    res.render("index", { messages: messages });
  },

  async getSignUp(req, res) {
    res.render("sign-up", { errors: [] });
  },

  async postSignUp(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("sign-up", { errors: errors.array() });
    }

    const { firstname, lastname, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.createUser(firstname, lastname, username, hashedPassword);

    res.redirect("/");
  },

  async getLogin(req, res) {
    res.render("login", { errors: [] });
  },

  async postLogin(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("login", { errors: errors.array() });
    }

    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.status(401).render("login", {
          errors: [{ msg: info.message }],
        });
      }

      req.login(user, (err) => {
        if (err) {
          return next(err);
        }

        res.redirect("/");
      });
    })(req, res, next);
  },

  async getMessageForm(req, res) {
    res.render("messageForm", { errors: [] });
  },

  async postMessageForm(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("messageForm", { errors: errors.array() });
    }

    const { title, text } = req.body;
    const user_id = req.user.id;

    await db.addMessage(title, text, user_id);

    res.redirect("/");
  },

  async logout(req, res, next) {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  },
};

export default controller;
