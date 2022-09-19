"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBInitialize = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoUrl = `mongodb+srv://admin_user:7DKuWFgqSSPzhcQ@cluster0.slzuj.mongodb.net/mryt_db?retryWrites=true&w=majority`;
const DBInitialize = (result) => {
    mongoose_1.default
        .connect(mongoUrl)
        .then(() => {
        result(null);
    })
        .catch((err) => {
        result(err);
    });
    mongoose_1.default.Promise = global.Promise;
};
exports.DBInitialize = DBInitialize;
