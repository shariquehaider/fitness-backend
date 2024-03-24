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
exports.getUserDetails = exports.updateUserHelper = exports.changePasswordController = exports.loginUserHelper = exports.registerUserHelper = void 0;
const user_1 = __importDefault(require("../models/user"));
const utils_1 = require("../utils/utils");
const index_1 = require("../index");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
function registerUserHelper(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const foundUser = yield user_1.default.findOne({ email: user.email });
            if (foundUser) {
                throw new Error("User already exists");
            }
            else {
                const hashedPassword = yield (0, utils_1.handleHash)(user.password);
                const newUser = new user_1.default({
                    email: user.email,
                    password: hashedPassword,
                    name: user.name
                });
                const savedUser = yield newUser.save();
                return { code: 1, message: "User Registered Sucessfully", isLoggedIn: true };
            }
        }
        catch (err) {
            return { code: 0, error: err };
        }
    });
}
exports.registerUserHelper = registerUserHelper;
function loginUserHelper(loginCreds) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const foundUser = yield user_1.default.findOne({ email: loginCreds.email });
            if (!foundUser) {
                throw new Error("Email not found");
            }
            else {
                const isMatched = yield bcryptjs_1.default.compare(loginCreds.password, foundUser.password);
                if (isMatched) {
                    console.log("hi");
                    const token = (0, utils_1.generateToken)(loginCreds.email, index_1.secretKey);
                    foundUser.token = token;
                    yield foundUser.save();
                    return { code: 1, message: "User Logged", token: token, userId: foundUser._id };
                }
                else {
                    throw new Error("Incorrect Email or Password");
                }
            }
        }
        catch (err) {
            return { code: 0, error: err };
        }
    });
}
exports.loginUserHelper = loginUserHelper;
function changePasswordController(newCreds) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const foundUser = yield user_1.default.findOne({ email: newCreds.email });
            if (!foundUser) {
                throw new Error("Email not found");
            }
            else {
                const userHashedPassword = yield (0, utils_1.handleHash)(newCreds.oldPassword);
                if (userHashedPassword === foundUser.password) {
                    const newHashedPassword = (0, utils_1.generateToken)(newCreds.newPassword, index_1.secretKey);
                    foundUser.password = newHashedPassword;
                    yield foundUser.save();
                }
                else {
                    throw new Error("Incorrect Password");
                }
                return { code: 1, message: "Password changed successfully" };
            }
        }
        catch (err) {
            return { code: 0, error: err };
        }
    });
}
exports.changePasswordController = changePasswordController;
function updateUserHelper(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const foundUser = yield user_1.default.findOne({ email: user.email });
            if (foundUser) {
                foundUser.age = user.age;
                foundUser.weight = user.weight;
                foundUser.height = user.height;
                yield foundUser.save();
            }
            return { code: 1, message: "Saved changes!" };
        }
        catch (err) {
            return { code: 0, error: err };
        }
    });
}
exports.updateUserHelper = updateUserHelper;
function getUserDetails(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const foundUser = yield user_1.default.findById(id);
            if (!foundUser) {
                throw new Error("User not Found");
            }
            else {
                return { code: 1, details: foundUser };
            }
        }
        catch (err) {
            return { code: 0, error: err };
        }
    });
}
exports.getUserDetails = getUserDetails;
