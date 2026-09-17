import { Router } from "express";
import controller from "../controllers/controller.js";
import { signUpValidateForm } from "../middlewares/signUpFormValidator.js";
import { loginFormValidator } from "../middlewares/loginFormValidator.js";

export const router = Router();

router.get("/", controller.getHomePage);
router.get("/sign-up", controller.getSignUp);
router.post("/sign-up", signUpValidateForm, controller.postSignUp);
router.get("/login", controller.getLogin);
router.post("/login", loginFormValidator, controller.postLogin);
