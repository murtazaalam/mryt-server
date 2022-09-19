import mongoose from "mongoose";

const Post = new mongoose.Schema(
  {
    momentType: { type: Array<string>, default: [] },
    name: { type: String, require: true },
    file: { type: Object, default: null },
    ipAddress: { type: String, default: null },
    country: { type: String, default: null },
  },

  { timestamps: true, collection: "post_collection" }
);
export default mongoose.model("post_collection", Post);
