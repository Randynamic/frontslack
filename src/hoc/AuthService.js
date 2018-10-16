class AuthService {
  redirect_url = "http://localhost:3000/auth/getToken";
  client_id = "265156972019.453766114196";
  client_secret = "0b50651557a6545be43add555ba6f830";
  base = "https://slack.com/api";
  signIn_url =
    "https://slack.com/oauth/authorize?client_id=265156972019.453766114196&scope=identity.basic";
  main_url = "/main";
  failed_url = "/auth/failed";

  get_token(code, callback) {
    const url = `${this.base}/oauth.access?client_id=${
      this.client_id
    }&client_secret=${this.client_secret}&code=${code}&redirect_uri=${
      this.redirect_url
    }`;
    return fetch(url)
      .then(results => {
        return results.json();
      })
      .then(session_data => {
        if (session_data && session_data.ok) {
          if (typeof callback === "function") {
            callback(session_data);
          }
        } else {
          this.redirect_signin();
          return false;
        }
      });
  }

  redirect_main() {}

  redirect_signin() {}

  redirect_failed() {}
}

export default new AuthService();
