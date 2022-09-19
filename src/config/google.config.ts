import { google } from "googleapis";
import path from "path";

export const getDriveService = () => {
  const KEYFILEPATH = path.join(
    __dirname,
    "../../secret/store-to-drive-b1074f824107.json"
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
