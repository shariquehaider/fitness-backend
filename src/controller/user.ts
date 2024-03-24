import express, { type Express, type Request, type Response } from "express";
import { RegisterUser, LoginCreds } from "../utils/interfaces";
import { registerUserHelper, loginUserHelper, updateUserHelper, changePasswordController, getUserDetails } from "../helpers/user";
import authMiddleware from "../middleware/authMiddleware";

const userController: Express = express();


userController.get("/", (req: Request, res: Response) => {
    res.json("Hi")
});

userController.post("/register", async (req: Request, res: Response) => {
    const user = req.body;
    const response = await registerUserHelper(user);
    if (response.code === 1) {
        res.json({message: response.message, code: response.code});
    } else {
        res.json({error: response.error, code: response.code});
    }
});

userController.post("/login", async (req: Request, res: Response) => {
    const user: LoginCreds = req.body;
    const response = await loginUserHelper(user);
    if (response.code === 1) {
        res.json({message: response.message, code: response.code, token: response.token, userId: response.userId});
    } else {
        res.json({error: response.error, code: response.code});
    }
});

userController.put("/update", authMiddleware, async (req: any, res: Response) => {
    try {
        const user = req.user;
        const response = await updateUserHelper(user);
        if (response.code === 1) {
            res.json({code: response.code, message: response.message})
        } else {
            throw new Error(response.error)
        }
    } catch (error) {
        res.json({code: 0, error: error});
    }
});


userController.put("/update/password", authMiddleware, async (req: any, res: Response) => {
    const user = req.user;
    const response = await changePasswordController(user);
    if (response.code === 1) {
        res.json({code: response.code, message: response.message});
    } else {
        res.json({code: response.code, error: response.error});
    }
});


userController.get("/login/:userId", authMiddleware, async (req: any, res: Response) => {
    const user = req.params.userId;
    const response = await getUserDetails(user);
    if (response.code === 1) {
        res.json({code: response.code, details: response.details});
    } else {
        res.json({code: response.code, error: response.code});
    }
});

export default userController;