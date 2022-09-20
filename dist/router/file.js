"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const fileRouter = (0, express_1.Router)();
const fs_1 = __importDefault(require("fs"));
const google_config_1 = require("../config/google.config");
let dir = "./uploads";
// let dirCsv = './uploads/csv';
if (!fs_1.default.existsSync(dir)) {
    fs_1.default.mkdirSync(dir);
}
//disk storage
let storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + file.originalname);
    },
});
const uploader = (0, multer_1.default)({ storage: storage });
const uploadSingleFile = async (fileName, filePath, mimeType) => {
    const folderId = "1wLt_qMCVTo_5XoweLtn-yWgNaXo3J-6G";
    const { data } = await (0, google_config_1.getDriveService)().files.create({
        media: {
            mimeType: mimeType,
            body: fs_1.default.createReadStream(filePath),
        },
        requestBody: {
            name: fileName,
            parents: [folderId],
        },
        fields: "id,name",
    });
    return data;
};
fileRouter.post("/upload", uploader.single("file"), async (req, res, next) => {
    const uploadedFile = req.file;
    if (uploadedFile === null || uploadedFile === undefined) {
        return res
            .json({
            error: true,
            msg: "Image upload failed, image not found",
        })
            .status(400);
    }
    //   console.log(uploadedFile.mimetype);
    const result = await uploadSingleFile(uploadedFile.filename, uploadedFile.path, uploadedFile.mimetype);
    return res.jsonp(result);
});
exports.default = fileRouter;
