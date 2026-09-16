import { Router } from "express";
import controller from "../controllers/controller.js";

export const router = Router();

router.get("/sign-up", controller.getSignUp);
