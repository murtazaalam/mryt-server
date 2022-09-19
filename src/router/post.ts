import { Router } from "express";
import { isIP } from "net";
const postRouter = Router();
import * as geoip from "geoip-lite";
import Post from "../schema/post";
postRouter.post("/", async (req, res, next) => {
  try {
    const name = req.body["name"];
    const types = req.body["types"];
    if (types && !Array.isArray(types))
      throw new Error("Moment types should be an array");
    if (!name) throw new Error("Name is required");
    // res.json({ body });

    const a = isIP(req.body["ip"]);
    let geo_address: { [key: string]: any } = null;
    if (a !== 0) {
      geo_address = geoip.lookup(req.body["ip"]);
    }
    const country = geo_address?.["country"];
    const option = {
      momentType: types,
      name: name,
      file: req.body["file"],
      ipAddress: req.body["ip"],
      country,
    };
    const x = new Post(option);
    const data = await x.save();
    return res.jsonp({ data });
  } catch (e: any) {
    return res.json({ error: true, message: e?.["message"] });
  }
});
export default postRouter;
