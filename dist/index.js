"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongo_config_1 = require("./config/mongo.config");
// import { getDriveService } from "./config/google.config";
const file_1 = __importDefault(require("./router/file"));
const post_1 = __importDefault(require("./router/post"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// app.use(express)
app.use("/file", file_1.default);
app.use("/post", post_1.default);
app.get("/", () => {
    console.log("HEllo");
});
const PORT = 4041;
app.listen(PORT, () => {
    console.log("server is running", PORT);
    (0, mongo_config_1.DBInitialize)((err) => {
        // console.log(err);
        if (err)
            console.log(err);
        else
            console.log("DB is connected");
    });
});
// getDriveService();
