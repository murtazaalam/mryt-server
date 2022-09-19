"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const net_1 = require("net");
const postRouter = (0, express_1.Router)();
const geoip = __importStar(require("geoip-lite"));
const post_1 = __importDefault(require("../schema/post"));
postRouter.post("/", async (req, res, next) => {
    try {
        const name = req.body["name"];
        const types = req.body["types"];
        if (types && !Array.isArray(types))
            throw new Error("Moment types should be an array");
        if (!name)
            throw new Error("Name is required");
        // res.json({ body });
        const a = (0, net_1.isIP)(req.body["ip"]);
        let geo_address = null;
        if (a !== 0) {
            geo_address = geoip.lookup(req.body["ip"]);
        }
        const country = geo_address === null || geo_address === void 0 ? void 0 : geo_address["country"];
        const option = {
            momentType: types,
            name: name,
            file: req.body["file"],
            ipAddress: req.body["ip"],
            country,
        };
        const x = new post_1.default(option);
        const data = await x.save();
        return res.jsonp({ data });
    }
    catch (e) {
        return res.json({ error: true, message: e === null || e === void 0 ? void 0 : e["message"] });
    }
});
exports.default = postRouter;
