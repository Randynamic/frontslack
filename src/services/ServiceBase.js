export default class ServiceBase {
  constructor() {
    this.redirectUrl = "http://localhost:3000/getToken";
    this.client_id = "265156972019.453766114196";
    this.client_secret = "0b50651557a6545be43add555ba6f830";
    // this.base = "https://slack.com/api";
    this.base = "https://...";
    // "xoxp-265156972019-445612557232-453332143921-cc0d041aabf51561b596781ee88019ca"
  }

  request(endPoint, params = "") {}

  getToken(session) {}
}
