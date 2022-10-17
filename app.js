import express from "express";
import fetch from "node-fetch";
import { env } from "./env.js";
import { getFetchApi } from "./helpers.js";

const app = express();

const { domain, username, password } = env;
const accessToken =
  "Basic " +
  Buffer.from(domain + "\\" + username + ":" + password).toString("base64");
const baseURL = `http://${env.domain}:${env.port}/AgilePointServer/Workflow`;
const url = `${baseURL}/CreateProcInst`;
const processIDUrl = `${baseURL}/GetReleasedPID/${env.appName}`;
const UUIDUrl = `${baseURL}/GetUUID`;

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

app.listen(8080, () => {
  console.table({
    username,
    password,
    accessToken,
    baseURL,
    url,
    processIDUrl,
    UUIDUrl,
  });
  console.log("listening...");
});
