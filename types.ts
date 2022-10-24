export type Url = {
  baseUrl: string;
  createProcessUrl: string;
  processIDUrl: string;
  UUIDUrl: string;
};

export type Attributes = {
  Name: string;
  Value: string;
};

export type CreateProcInstDto = {
  ProcessID: string;
  ProcessInstID: string;
  ProcInstName: string;
  WorkObjID: string;
  WorkObjInfo: null;
  SuperProcInstID: null;
  Initiator: string;
  CustomID: string;
  Attributes: Attributes[];
  blnStartImmediately: boolean;
};

export type AppData = {
  applicationDate: string;

  hkid: string;

  product: string;

  cardType: string;

  refNo: string;

  AppDetails: AppDetails;
};

type AppDetails = {
  salutation: string;

  surname: string;

  givenName: string;

  dob: string;

  mobileNo: string;

  homeNo: string;

  homeAddress: string;

  emailAddress: string;

  nationality: string;

  workingStatus: string;

  companyName: string;

  companyTel: string;

  monthlyIncome: number;

  opOutMailing: boolean;

  opOutPhoneCall: boolean;

  opOutEmail: boolean;

  opOutSMS: boolean;
};
