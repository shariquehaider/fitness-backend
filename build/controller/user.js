"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../helpers/user");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const userController = (0, express_1.default)();
userController.get("/", (req, res) => {
    res.json("Hi");
});
userController.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const response = yield (0, user_1.registerUserHelper)(user);
    if (response.code === 1) {
        res.json({ message: response.message, code: response.code });
    }
    else {
        res.json({ error: response.error, code: response.code });
    }
}));
userController.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const response = yield (0, user_1.loginUserHelper)(user);
    if (response.code === 1) {
        res.json({ message: response.message, code: response.code, token: response.token, userId: response.userId });
    }
    else {
        res.json({ error: response.error, code: response.code });
    }
}));
userController.put("/update", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const response = yield (0, user_1.updateUserHelper)(user);
        if (response.code === 1) {
            res.json({ code: response.code, message: response.message });
        }
        else {
            throw new Error(response.error);
        }
    }
    catch (error) {
        res.json({ code: 0, error: error });
    }
}));
userController.put("/update/password", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const response = yield (0, user_1.changePasswordController)(user);
    if (response.code === 1) {
        res.json({ code: response.code, message: response.message });
    }
    else {
        res.json({ code: response.code, error: response.error });
    }
}));
userController.get("/login/:userId", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.params.userId;
    const response = yield (0, user_1.getUserDetails)(user);
    if (response.code === 1) {
        res.json({ code: response.code, details: response.details });
    }
    else {
        res.json({ code: response.code, error: response.code });
    }
}));
exports.default = userController;
