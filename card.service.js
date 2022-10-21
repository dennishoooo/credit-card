export class CardService {
  constructor(url, accessToken) {
    this.url = url;
    this.accessToken = accessToken;
  }
  async getProcessID() {
    let result = await getFetchApi(url.processIDUrl, this.accessToken);
    let processID = result.GetReleasedPIDResult;
    return processID;
  }
}
