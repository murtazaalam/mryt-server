"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDriveService = void 0;
const googleapis_1 = require("googleapis");
const path_1 = __importDefault(require("path"));
const getDriveService = () => {
    const KEYFILEPATH = path_1.default.join(__dirname, "../../secret/store-to-drive-b1074f824107.json");
    //   console.log(KEYFILEPATH);
    const SCOPES = ["https://www.googleapis.com/auth/drive"];
    const auth = new googleapis_1.google.auth.GoogleAuth({
        keyFile: KEYFILEPATH,
        scopes: SCOPES,
    });
    const driveService = googleapis_1.google.drive({ version: "v3", auth });
    return driveService;
};
exports.getDriveService = getDriveService;
