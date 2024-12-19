"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkModel = exports.TagModel = exports.ContentModle = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true });
exports.UserModel = mongoose_1.default.model("User", userSchema);
const contentTypes = ['image', 'video', 'article', 'audio'];
const contentSchema = new mongoose_1.default.Schema({
    Link: {
        type: String,
        required: true
    },
    Type: {
        type: String,
        // enum : contentTypes,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    tags: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Tag' }],
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});
exports.ContentModle = mongoose_1.default.model("Content", contentSchema);
const tagSchema = new mongoose_1.default.Schema({
    Title: {
        type: String,
        required: true
    }
});
exports.TagModel = mongoose_1.default.model("Tag", tagSchema);
const LinkSchema = new mongoose_1.default.Schema({
    hash: {
        type: String,
        require: true
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        // unique: true
    }
});
exports.LinkModel = mongoose_1.default.model("Link", LinkSchema);
