import { Router } from "express";
import { porfile, signin, signout, signup } from "../controllers/auth.controller.js";
import { isAuth } from "../middlewares/authmiddleware.js";

const router =  Router();

router.post("/signin", signin);

router.post("/signup", signup);

router.post("/sigout", signout);

router.get("/porfile", isAuth, porfile);

export default router;