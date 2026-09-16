import { Router } from "express";
import controller from "../controllers/controller.js";
import { validateForm } from "../middlewares/formValidator.js";

export const router = Router();

router.get("/", controller.getHomePage);
router.get("/sign-up", controller.getSignUp);
router.post("/sign-up", validateForm, controller.postSignUp);
