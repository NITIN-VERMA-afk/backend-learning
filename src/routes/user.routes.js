import { Router } from "express";
import { AboutUser, registerUser } from "../controllers/user.controller.js";
import {upload} from "../middelwares/multer.middelware.js"

const router = Router();


router.route("/about").get(AboutUser)




router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },{
            name:"coverImage",
            maxCount:1

        }
    ]),
    registerUser);
    router.route("/login").post(loginUser)

    //secured routes

    router.route("logout").post(verifyJWT,logoutUser)
    

export default router;
