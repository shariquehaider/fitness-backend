"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../index");
const authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
        return res.status(401).json({ message: "Authorization denied, no token provided" });
    }
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        const decode = jsonwebtoken_1.default.verify(token, index_1.secretKey, (err, user) => {
            if (err) {
                return res.status(403).json({ error: "Authorization failed" });
            }
            else {
                return user;
            }
        });
        req.user = decode;
        next();
    }
};
exports.default = authMiddleware;
