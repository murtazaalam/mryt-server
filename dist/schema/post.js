"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Post = new mongoose_1.default.Schema({
    momentType: { type: (Array), default: [] },
    name: { type: String, require: true },
    file: { type: Object, default: null },
    ipAddress: { type: String, default: null },
    country: { type: String, default: null },
}, { timestamps: true, collection: "post_collection" });
exports.default = mongoose_1.default.model("post_collection", Post);
