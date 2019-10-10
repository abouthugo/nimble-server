import express from "express";
import json2xls from "json2xls";
import bodyParser from "body-parser";
const app = express();
const port = process.env.PORT || 3300;
app.use(json2xls.middleware);
app.use(bodyParser.json({ limit: "50mb", extended: true }));

app.post("/api/xlsx", (req, res) => {
  res.xls("hats.xlsx", req.body.hats);
});

app.listen(port, () => {
  console.log(`Listening in ${port}`);
});
