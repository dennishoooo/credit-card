import { env } from "./env";
import { getFetchApi, postFetchApi } from "./helpers";
import { Url } from "./types";

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

  createProcess = async () => {
    let processID = this.getProcessID();
    let uuid = this.genUUID();
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
        { Name: "test1", Value: "test123" },
        { Name: "test2", Value: "test1234" },
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
