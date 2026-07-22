// External Module
import express from 'express';
export const authRouter = express.Router();

// Local Module
import { getLogin, getSignup, postLogin, postLogout, postSignup } from '../controllers/authController.js';

authRouter.get("/login", getLogin);
authRouter.get("/signup", getSignup);
authRouter.post("/login", postLogin);
authRouter.post("/signup", postSignup);
authRouter.post("/logout", postLogout);
