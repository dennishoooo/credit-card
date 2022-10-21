import { getFetchApi } from "./helpers";
import { Url } from "./types";

export class CardService {
  constructor(private url: Url, private accessToken: string) {}
  genUUID = async () => {
    let result = await getFetchApi(this.url.UUIDUrl, this.accessToken);
    return result;
  };
  getProcessID = async (): Promise<string> => {
    let result = await getFetchApi(this.url.processIDUrl, this.accessToken);
    let processID = result.GetReleasedPIDResult;
    return processID;
  };
}
