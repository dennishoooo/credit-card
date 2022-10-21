import express from "express";
import fetch from "node-fetch";
import { env } from "./env";
import { getFetchApi } from "./helpers";
import { CardService } from "./card.service";
import { CardController } from "./card.controller";
import { Url } from "./types";

const app = express();

const { domain, username, password, port, appName } = env;
const accessToken =
  "Basic " +
  Buffer.from(domain + "\\" + username + ":" + password).toString("base64");
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

app.get("/data", (req, res) => {
  res.json({
    applicationDate: "20181204",
    hkid: "K888888(4)",
    product: "WAKUWAKU",
    cardType: "INSTANT",
    refNo: "20221004WAWA",
    AppDetails: {
      salutation: "MR",
      surname: "CHAN",
      givenName: "TAI MAN",
      dob: "31011995",
      mobileNo: "98765432",
      homeNo: "23456789",
      homeAddress: "20/F TST BLDG",
      emailAddress: "dummy@aeon.com.hk",
      nationality: "HK",
      workingStatus: "Employed",
      companyName: "AEON CREDIT",
      companyTel: "21111111",
      monthlyIncome: 50000,
      opOutMailing: true,
      opOutPhoneCall: true,
      opOutEmail: false,
      opOutSMS: false,
    },
  });
});

app.get("/hkid", (req, res) => {
  console.log(req.query);
  res.json({ hkid: "Y123456(7)" });
});

app.get("/processID", async (req, res) => {
  let result = await getFetchApi(processIDUrl, accessToken);
  let processID = result.GetReleasedPIDResult;
  res.json(processID);
});

app.get("/uuid", async (req, res) => {
  let response = await fetch(UUIDUrl, {
    headers: {
      Authorization: accessToken,
    },
  });
  let result = await response.json();
  let uuid = result.GetUUIDResult;
  res.json(uuid);
});

app.get("/processIDtest", cardController.getProcessID);

app.listen(8080, () => {
  console.table({
    username,
    password,
    accessToken,
    baseUrl,
    createProcessUrl,
    processIDUrl,
    UUIDUrl,
  });
  console.log("listening...");
});
