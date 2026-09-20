import { Router } from "express";
import controller from "../controllers/controller.js";
import { signUpValidateForm } from "../middlewares/signUpFormValidator.js";
import { loginFormValidator } from "../middlewares/loginFormValidator.js";
import { requireLogin } from "../middlewares/requireLogin.js";
import { memberFormValidator } from "../middlewares/memberFormValidator.js";

export const router = Router();

router.get("/", controller.getHomePage);
router.get("/sign-up", controller.getSignUp);
router.post("/sign-up", signUpValidateForm, controller.postSignUp);
router.get("/login", controller.getLogin);
router.post("/login", loginFormValidator, controller.postLogin);
router.get("/messages/new", requireLogin, controller.getMessageForm);
router.post("/messages/new", requireLogin, controller.postMessageForm);
router.get("/logout", requireLogin, controller.logout);
router.get("/become-member", requireLogin, controller.getMemberForm);
router.post(
  "/become-member",
  requireLogin,
  memberFormValidator,
  controller.postMemberForm,
);
router.get("/become-admin", requireLogin, controller.getAdminForm);
router.post(
  "/become-admin",
  requireLogin,
  memberFormValidator,
  controller.postAdminForm,
);

router.post("/messages/:id/delete", requireLogin, controller.deleteMessage);
