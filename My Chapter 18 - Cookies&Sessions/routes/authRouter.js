// External Module
import express from 'express'
export const authRouter = express.Router();

// Local Module
import { getLogin, postLogin, postLogout} from '../controllers/authController.js';

authRouter.get("/login", getLogin);
authRouter.post("/login", postLogin);
authRouter.post("/logout", postLogout);

