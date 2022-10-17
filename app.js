import express from "express";
// import fetch from "node-fetch";
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
const processID = `${baseURL}/GetReleasedPID/${env.APP_NAME}`;
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

app.get("/test", async (req, res) => {
  console.log(UUIDUrl);
  let response = await fetch(UUIDUrl, {
    headers: {
      Authorization: accessToken,
    },
  });
  // headers.set('Authorization', 'Basic ' + Buffer.from(username + ":" + password).toString('base64'));
  let result = await response.json();
  console.log(result);
  res.json("ok");
});

app.listen(8080, () => {
  console.table({
    username,
    password,
    accessToken,
    baseURL,
    url,
    processID,
    UUIDUrl,
  });
  console.log("listening...");
});
