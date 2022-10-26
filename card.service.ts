import { env } from "./env";
import { getFetchApi, postFetchApi } from "./helpers";
import { AppData, Url } from "./types";

export class CardService {
  constructor(private url: Url, private accessToken: string) {}

  genUUID = async () => {
    let result = await getFetchApi(this.url.UUIDUrl, this.accessToken);
    let uuid = result.GetUUIDResult;
    return uuid;
  };

  getProcessID = async (): Promise<string> => {
    let result = await getFetchApi(this.url.processIDUrl, this.accessToken);
    let processID = result.GetReleasedPIDResult;
    return processID;
  };

  createProcess = async (body: AppData) => {
    const { applicationDate, hkid, product, cardType, refNo, AppDetails } =
      body;
    let processID = await this.getProcessID();
    let uuid = await this.genUUID();

    let data = {
      ProcessID: processID,
      ProcessInstID: uuid, // "0FD3088F40B640D4AFE41AEEBDAE0004",
      ProcInstName: "API Credit Card Approval - " + uuid,
      WorkObjID: uuid, //"0FD3088F40B640D4AFE41AEEBDAE0004",
      WorkObjInfo: null,
      SuperProcInstID: null,
      Initiator: env.username, // "mydomain\\andy",
      CustomID: uuid, //"0FD3088F40B640D4AFE41AEEBDAE0004",
      Attributes: [
        // { Name: "/pd:AP/pd:dataSource/pd:APDataEntity/pd:DSDB/pd:APCreditCard__u/pd:SubmitDate__u", Value: applicationDate },
        {
          Name: "/pd:AP/pd:dataSource/pd:APDataEntity/pd:DSDB/pd:APCreditCard__u/pd:CardApplicationType__u",
          Value: cardType,
        },
        {
          Name: "/pd:AP/pd:dataSource/pd:APDataEntity/pd:DSDB/pd:APCreditCard__u/pd:ProductCode__u",
          Value: product,
        },

        {
          Name: "/pd:AP/pd:dataSource/pd:APDataEntity/pd:DSDB/pd:APCreditCard__u/pd:HKIDNo__u",
          Value: hkid,
        },
        {
          Name: "/pd:AP/pd:dataSource/pd:APDataEntity/pd:DSDB/pd:APCreditCard__u/pd:Salutation__u",
          Value: AppDetails.salutation,
        },
        {
          Name: "/pd:AP/pd:dataSource/pd:APDataEntity/pd:DSDB/pd:APCreditCard__u/pd:Surname__u",
          Value: AppDetails.surname,
        },
        {
          Name: "/pd:AP/pd:dataSource/pd:APDataEntity/pd:DSDB/pd:APCreditCard__u/pd:Givenname__u",
          Value: AppDetails.givenName,
        },
        {
          Name: "/pd:AP/pd:dataSource/pd:APDataEntity/pd:DSDB/pd:APCreditCard__u/pd:MobileNo__u",
          Value: AppDetails.mobileNo,
        },
        {
          Name: "/pd:AP/pd:dataSource/pd:APDataEntity/pd:DSDB/pd:APCreditCard__u/pd:DateofBirth__u",
          Value: AppDetails.dob,
        },
        {
          Name: "/pd:AP/pd:dataSource/pd:APDataEntity/pd:DSDB/pd:APCreditCard__u/pd:HomeTelNo__u",
          Value: AppDetails.homeNo,
        },
        {
          Name: "/pd:AP/pd:dataSource/pd:APDataEntity/pd:DSDB/pd:APCreditCard__u/pd:EmailAddress__u",
          Value: AppDetails.emailAddress,
        },
        {
          Name: "/pd:AP/pd:dataSource/pd:APDataEntity/pd:DSDB/pd:APCreditCard__u/pd:Nationality__u",
          Value: AppDetails.nationality,
        },

        {
          Name: "/pd:AP/pd:dataSource/pd:APDataEntity/pd:DSDB/pd:APCreditCard__u/pd:ResidentialAddress__u",
          Value: AppDetails.homeAddress,
        },
        {
          Name: "/pd:AP/pd:dataSource/pd:APDataEntity/pd:DSDB/pd:APCreditCard__u/pd:WorkingStatus__u",
          Value: AppDetails.workingStatus,
        },

        {
          Name: "/pd:AP/pd:dataSource/pd:APDataEntity/pd:DSDB/pd:APCreditCard__u/pd:CompanyName__u",
          Value: AppDetails.companyName,
        },
        {
          Name: "/pd:AP/pd:dataSource/pd:APDataEntity/pd:DSDB/pd:APCreditCard__u/pd:CompanyTelNo__u",
          Value: AppDetails.companyTel,
        },
        {
          Name: "/pd:AP/pd:dataSource/pd:APDataEntity/pd:DSDB/pd:APCreditCard__u/pd:MonthlyIncome__u",
          Value: AppDetails.monthlyIncome,
        },

        {
          Name: "/pd:AP/pd:dataSource/pd:APDataEntity/pd:DSDB/pd:APCreditCard__u/pd:OptOutEmail__u",
          Value: AppDetails.opOutMailing,
        },
        {
          Name: "/pd:AP/pd:dataSource/pd:APDataEntity/pd:DSDB/pd:APCreditCard__u/pd:OptOutMailing__u",
          Value: AppDetails.opOutPhoneCall,
        },
        {
          Name: "/pd:AP/pd:dataSource/pd:APDataEntity/pd:DSDB/pd:APCreditCard__u/pd:OptOutPhoneCall__u",
          Value: AppDetails.opOutEmail,
        },
        {
          Name: "/pd:AP/pd:dataSource/pd:APDataEntity/pd:DSDB/pd:APCreditCard__u/pd:OptOutSMS__u",
          Value: AppDetails.opOutSMS,
        },

        { Name: "/pd:AP/pd:formFields/pd:RefNo", Value: refNo },
        {
          Name: "/pd:AP/pd:dataSource/pd:APDataEntity/pd:DSDB/pd:APCreditCard__u/pd:SubmitDate__u",
          Value: applicationDate,
        },
      ],
      blnStartImmediately: true,
    };

    console.log(data);

  //   let result = await postFetchApi(
  //     this.url.createProcessUrl,
  //     data,
  //     this.accessToken
  //   );
    return data;
  // };
}
