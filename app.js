import express from "express";
import fetch from "node-fetch";
import { env } from "./env.js";

const app = express();
const domain = env.DOMAIN;
const username = env.USERNAME;
const password = env.PASSWORD;
const accessToken =
  "Basic " +
  Buffer.from(domain + "\\" + username + ":" + password).toString("base64");
const baseURL = `http://${env.DOMAIN}:${env.PORT}/AgilePointServer/Workflow`;
const url = `${baseURL}/CreateProcInst`;
const processIDUrl = `${baseURL}/GetReleasedPID/${env.APP_NAME}`;
const UUIDUrl = `${baseURL}/GetUUID`;

// http://EC2AMAZ-P5QI6NR:13490/agilepointserver

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
  let response = await fetch(processIDUrl, {
    headers: {
      Authorization: accessToken,
    },
  });
  let result = await response.json();
  res.json(result);
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
