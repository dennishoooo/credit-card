import express from "express";
import { env } from "./env";
import { CardService } from "./card.service";
import { CardController } from "./card.controller";
import { Url } from "./types";

const app = express();
const PORT = 8080;

const { domain, username, password, port, appName } = env;
const accessToken =
  "Basic " + Buffer.from(username + ":" + password).toString("base64");
const baseUrl = `http://${domain}:${port}/AgilePointServer/Workflow`;
const createProcessUrl = `${baseUrl}/CreateProcInst`;
const processIDUrl = `${baseUrl}/GetReleasedPID/${appName}`;
const UUIDUrl = `${baseUrl}/GetUUID`;
const url: Url = { baseUrl, createProcessUrl, processIDUrl, UUIDUrl };

const test = new CardService(url, accessToken);
const cardController = new CardController(test);

app.use(express.json());

app.get("/", async (req, res) => {
  res.json("hello world");
});

app.get("/hkid", (req, res) => {
  console.log(req.query);
  res.json({ hkid: "Y123456(7)" });
});

app.get("/processID", cardController.getProcessID);
app.get("/uuid", cardController.genUUID);
app.post("/createProcess", cardController.createProcess);

app.listen(PORT, () => {
  console.table({
    username,
    password,
    accessToken,
    baseUrl,
    createProcessUrl,
    processIDUrl,
    UUIDUrl,
  });
  console.log(`listening at http://localhost:${PORT}`);
});
