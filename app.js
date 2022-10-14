import express from "express";
// import fetch from "node-fetch";
import { env } from "./env.js";

const app = express();
const url = `https://${env.DOMAIN}:${env.PORT}/AgilePointService/Workflow/CreateProcInst`;
const UUIDUrl = `https://${env.DOMAIN}:${env.PORT}/AgilePointService/Workflow/GetUUID`;

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
  let response = await fetch(UUIDUrl);
  let result = await response.json();
  console.log(result);
  res.json("ok");
});

app.listen(8080, () => {
  console.log("listening...");
});
