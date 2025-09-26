import Router from "express-promise-router"
import { signin, signup, signout, porfile } from "../controllers/auth.controller.js";

const router =  Router();

router.post("/signin", signin);

router.post("/signup", signup);

router.post("/sigout", signout)

router.get("/porfile", porfile)

export default router;