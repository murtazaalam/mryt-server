import express from "express";
import { DBInitialize } from "./config/mongo.config";
// import { getDriveService } from "./config/google.config";
import fileRouter from "./router/file";
import postRouter from "./router/post";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
// app.use(express)
app.use("/file", fileRouter);
app.use("/post", postRouter);
app.get("/", () => {
  console.log("HEllo");
});
const PORT = 4041;
app.listen(PORT, () => {
  console.log("server is running", PORT);
  DBInitialize((err) => {
    // console.log(err);
    if (err) console.log(err);
    else console.log("DB is connected");
  });
});

// getDriveService();
