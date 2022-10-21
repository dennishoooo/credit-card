import { getFetchApi } from "./helpers";
import { Url } from "./types";

export class CardService {
  constructor(private url: Url, private accessToken: string) {
    this.url = url;
    this.accessToken = accessToken;
  }
  async getProcessID() {
    let result = await getFetchApi(this.url.processIDUrl, this.accessToken);
    let processID = result.GetReleasedPIDResult;
    return processID;
  }
}
