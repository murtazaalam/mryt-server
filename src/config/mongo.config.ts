import mongoose from "mongoose";
const mongoUrl = `mongodb+srv://admin_user:7DKuWFgqSSPzhcQ@cluster0.slzuj.mongodb.net/mryt_db?retryWrites=true&w=majority`;
export const DBInitialize = (result: (arg0: any) => void) => {
  mongoose
    .connect(mongoUrl)
    .then(() => {
      result(null);
    })
    .catch((err) => {
      result(err);
    });
  mongoose.Promise = global.Promise;
};
