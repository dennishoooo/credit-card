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
