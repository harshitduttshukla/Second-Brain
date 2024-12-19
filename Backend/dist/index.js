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
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
const zod_1 = __importDefault(require("zod"));
const config_1 = require("./config");
const middleware_1 = require("./middleware");
const units_1 = require("./units");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
mongoose_1.default.connect("mongodb+srv://harshitshukla:5oEGVqmxuPryvEwg@cluster1.kci1x.mongodb.net/secondBrainly22");
app.post('/api/v1/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    console.log("Incoming request body:", req.body);
    req.body.username = (_a = req.body.username) === null || _a === void 0 ? void 0 : _a.trim();
    req.body.password = (_b = req.body.password) === null || _b === void 0 ? void 0 : _b.trim();
    const requireBody = zod_1.default.object({
        username: zod_1.default.string().min(3).max(10),
        password: zod_1.default.string()
            .min(8)
            .max(20)
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/),
    });
    // Validate the request body
    const parseDataWithSuccess = requireBody.safeParse(req.body);
    if (!parseDataWithSuccess.success) {
        return res.status(400).json({
            message: "Validation failed. Check username and password constraints.",
            errors: parseDataWithSuccess.error.errors,
        });
    }
    const { username, password } = parseDataWithSuccess.data;
    try {
        // Check if the username already exists
        const existingUser = yield db_1.UserModel.findOne({ username });
        if (existingUser) {
            return res.status(409).json({
                message: 'User already exists with this username',
            });
        }
        // Create the user in the database
        yield db_1.UserModel.create({ username, password });
        return res.status(201).json({
            message: "Signed up successfully",
        });
    }
    catch (err) {
        console.error("Server error:", err);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}));
app.post('/api/v1/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const existingUser = yield db_1.UserModel.findOne({
            username,
            password
        });
        if (!existingUser) {
            res.status(403).json({
                Message: "Wrong username,password"
            });
        }
        if (existingUser) {
            const token = jsonwebtoken_1.default.sign({
                id: existingUser._id,
            }, config_1.JWT_SECRET);
            res.status(200).json({
                message: "Logged in",
                token
            });
        }
    }
    catch (err) {
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}));
app.post("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Link = req.body.Link;
    const Type = req.body.Type;
    console.log(Type);
    yield db_1.ContentModle.create({
        Link,
        Type,
        title: req.body.title,
        // @ts-ignore
        userId: req.userId,
        tags: []
    });
    console.log("hello");
    res.json({
        message: "Content added"
    });
}));
app.get("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const userId = req.userId;
    // console.log(userId);
    const content = yield db_1.ContentModle.find({
        userId: userId
    }).populate("userId", "username");
    res.json({
        content
    });
}));
app.delete("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.contentId;
    yield db_1.ContentModle.deleteMany({
        contentId,
        // @ts-ignore
        userId: req.userId
    });
    res.json({
        message: "Content deleted",
    });
}));
app.post("/api/v1/brain/share", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    // console.log(share);
    try {
        if (share) {
            const existingLink = yield db_1.LinkModel.findOne({
                // @ts-ignore
                userId: req.userId,
            });
            if (existingLink) {
                res.json({
                    hash: existingLink.hash
                });
                return;
            }
            const hash = (0, units_1.random)(10);
            yield db_1.LinkModel.create({
                // @ts-ignore
                userId: req.userId,
                hash: hash
            });
            res.json({
                hash
            });
        }
        else {
            yield db_1.LinkModel.deleteOne({
                // @ts-ignore
                userId: req.userId,
            });
            res.json({
                message: "Removed Link"
            });
        }
    }
    catch (err) {
        console.log(err);
    }
}));
app.get("/api/v1/brain/:shareLink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    console.log(hash);
    const link = yield db_1.LinkModel.findOne({
        hash
    });
    console.log(link);
    if (!link) {
        res.status(404).json({
            message: "Sorry incorrect input"
        });
        return;
    }
    const content = yield db_1.ContentModle.findOne({
        // @ts-ignore
        userId: db_1.LinkModel.userId
    });
    const user = yield db_1.UserModel.findOne({
        // @ts-ignore
        _id: link.userId
    });
    if (!user) {
        res.status(411).json({
            message: "user not found, error should ideally not happen"
        });
        return;
    }
    res.json({
        username: user.username,
        content: content
    });
}));
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
