"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const userMiddleware = (req, res, next) => {
    const header = req.headers["authorization"];
    // console.log(header);
    const array = header === null || header === void 0 ? void 0 : header.split(" ");
    // if(array && array[0] !== "Bearer"){
    //     res.status(403).json({
    //         message: "You are not logged in"            
    //     })
    //     return;
    // }
    const decoded = jsonwebtoken_1.default.verify(header === null || header === void 0 ? void 0 : header.split(" ")[1], config_1.JWT_SECRET);
    // console.log("eereferfe343434343434");
    if (decoded) {
        if (typeof decoded === "string") {
            res.status(403).json({
                message: "You are not logged in"
            });
            return;
        }
        // @ts-ignore
        req.userId = decoded.id;
        next();
    }
    else {
        res.status(403).json({
            message: "You are not logged in"
        });
    }
};
exports.userMiddleware = userMiddleware;
