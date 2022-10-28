import { env } from "./env";
import { formatDate, getFetchApi, postFetchApi } from "./helpers";
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
      ProcInstName: "Process Map Approval -" + uuid,
      WorkObjID: uuid, //"0FD3088F40B640D4AFE41AEEBDAE0004",
      WorkObjInfo: null,
      SuperProcInstID: null,
      Initiator: env.username, // "mydomain\\andy",
      CustomID: uuid, //"0FD3088F40B640D4AFE41AEEBDAE0004",
      Attributes: [
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
          Value: formatDate(AppDetails.dob),
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
          Value: formatDate(applicationDate),
        },
        {
          Name: "/pd:AP/pd:formFields/pd:Signature",
          Value:
            "data:image/png;base64,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",
        },
      ],
      blnStartImmediately: true,
    };

    let result = await postFetchApi(
      this.url.createProcessUrl,
      data,
      this.accessToken
    );
    return result;
  };
}
