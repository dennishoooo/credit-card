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
      ProcInstName: "Process Map Approval - " + uuid,
      WorkObjID: uuid, //"0FD3088F40B640D4AFE41AEEBDAE0004",
      WorkObjInfo: null,
      SuperProcInstID: null,
      Initiator: env.username, // "mydomain\\andy",
      CustomID: uuid, //"0FD3088F40B640D4AFE41AEEBDAE0004",
      Attributes: [
        // { Name: "pd:SubmitDate__u", Value: applicationDate },
        { Name: "pd:RefNo", Value: refNo },
        { Name: "pd:CardApplicationType__u", Value: cardType },
        { Name: "pd:ProductCode__u", Value: product },

        { Name: "pd:HKIDNo__u", Value: hkid },
        { Name: "pd:Salutation__u", Value: AppDetails.salutation },
        { Name: "pd:Surname__u", Value: AppDetails.surname },
        { Name: "pd:Givenname__u", Value: AppDetails.givenName },
        { Name: "pd:MobileNo__u", Value: AppDetails.mobileNo },
        { Name: "pd:HomeTelNo__u", Value: AppDetails.homeNo },

        { Name: "pd:DateofBirth__u", Value: AppDetails.dob },
        { Name: "pd:ResidentialAddress__u", Value: AppDetails.homeAddress },
        { Name: "pd:EmailAddress__u", Value: AppDetails.emailAddress },
        { Name: "pd:Nationality__u", Value: AppDetails.nationality },
        { Name: "pd:WorkingStatus__u", Value: AppDetails.workingStatus },

        { Name: "pd:CompanyName__u", Value: AppDetails.companyName },
        { Name: "pd:CompanyTelNo__u", Value: AppDetails.companyTel },
        { Name: "pd:MonthlyIncome__u", Value: AppDetails.monthlyIncome },

        { Name: "pd:OptOutEmail__u", Value: AppDetails.opOutMailing },
        { Name: "pd:OptOutMailing__u", Value: AppDetails.opOutPhoneCall },
        { Name: "pd:OptOutPhoneCall__u", Value: AppDetails.opOutEmail },
        { Name: "pd:OptOutSMS__u", Value: AppDetails.opOutSMS },
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
