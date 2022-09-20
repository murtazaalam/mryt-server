import { google } from "googleapis";
import path from "path";

export const getDriveService = () => {
  const KEYFILEPATH = path.join(
    __dirname,
    "../../secret/video-response-990d30e2fa59.json"
  );
//   console.log(KEYFILEPATH);

  const SCOPES = ["https://www.googleapis.com/auth/drive"];

  const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
  });
  const driveService = google.drive({ version: "v3", auth });
  return driveService;
};
