import express from "express";
import json2xls from "json2xls";
import bodyParser from "body-parser";
import cors from "cors";

const whitelist = JSON.parse(process.env.WHITELIST);
const corsOpts = {
  origin: (origin, cb) => {
    if (whitelist.indexOf(origin) !== -1) {
      cb(null, true);
    } else {
      cb(new Error("Not allowed by CORS"));
    }
  }
};
const port = process.env.PORT || 3300;

const app = express();
app.use(cors(corsOpts));
app.use(json2xls.middleware);
app.use(bodyParser.json({ limit: "50mb", extended: true }));

app.post("/api/xlsx", (req, res) => {
  res.xls("hats.xlsx", req.body.hats);
});

app.listen(port, () => {
  console.log(`Listening in ${port}`);
});
