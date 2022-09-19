import { Router } from "express";
import multer from "multer";
const fileRouter = Router();
import fs from "fs";
import { getDriveService } from "../config/google.config";
let dir = "./uploads";
// let dirCsv = './uploads/csv';

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

//disk storage
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.originalname);
  },
});

const uploader = multer({ storage: storage });
const uploadSingleFile = async (
  fileName: string,
  filePath: string,
  mimeType: string
) => {
  const folderId = "1jazhDe8Y4S0uQ6gCxpxhvz6N-lGnxIE6";
  const { data } = await getDriveService().files.create({
    media: {
      mimeType: mimeType,
      body: fs.createReadStream(filePath),
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
  const result = await uploadSingleFile(
    uploadedFile.filename,
    uploadedFile.path,
    uploadedFile.mimetype
  );
  return res.jsonp(result);
});
export default fileRouter;
