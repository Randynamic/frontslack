export default class ServiceBase {
  constructor() {
    this.redirectUrl = "http://localhost:3000/getToken";
    this.client_id = "265156972019.453766114196";
    this.client_secret = "0b50651557a6545be43add555ba6f830";
    // this.base = "https://slack.com/api";
    this.base = "https://...";
    // "xoxp-265156972019-445612557232-453332143921-cc0d041aabf51561b596781ee88019ca"
    this.access_token = localStorage.getItem("access_token");
  }

  request(endPoint, params = "") {
    let url = null;
    console.log("> request input > ", endPoint, params, this.session);
    const p_getToken = new Promise((resolve, reject) => {
      console.log("p_getToken");
      if (this.session && !this.access_token && this.session.code) {
        console.log("1");
        resolve(this.session);
      } else if (this.access_token) {
        console.log("2");
        resolve(this.session);
      } else {
        console.log("3");
        reject("no application code");
      }
    });

    const p_request = fetch(
      `${this.base}${endPoint}?${params}&token=${this.session.access_token}`
    )
      .then(response => response.json())
      .catch(e => console.log("asdasdd", e));

    return Promise.all([p_getToken, p_request]).then(values => {
      console.log("promise final value", values);
      if (values[0].token) {
        url = `${this.base}${endPoint}?${params}&token=${values[0].token}`;
        return fetch(url);
      } else if (values[0].code) {
        console.log("code", values[0].code);
        this.getToken(values[0])
          .then(results => {
            console.log("results", results);
            if (!results.ok) {
              throw new Error(200);
            } else {
              localStorage.setItem("access_token", results.access_token);
              localStorage.setItem("session", JSON.stringify(results));
            }
          })
          .catch(e => {});
      } else {
        localStorage.setItem("session", JSON.stringify(values[0]));
        console.log("values", values);
        throw new Error(300);
      }
    });
  }

  getToken(session) {
    console.log("session");
    const url = `${this.base}/oauth.access?client_id=${
      this.client_id
    }&client_secret=${this.client_secret}&code=${session.code}&redirect_uri=${
      this.redirectUrl
    }`;
    return fetch(url).then(results => {
      return results.json();
    });
  }
}
