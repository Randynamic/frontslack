class AuthService {
  redirectUrl = "http://localhost:3000/auth/getToken";
  client_id = "265156972019.453766114196";
  client_secret = "0b50651557a6545be43add555ba6f830";
  base = "https://slack.com/api";
  // base = "https://...";
  isAuthenticated = false;
  access_token = null;
  auth_code = null;
  redirectToAppLogin = false;
  authenticate = code => {
    this.auth_code = code || null;
    console.log(this.auth_code);
    return new Promise((resolve, reject) => {
      if (!this.access_token && this.auth_code) {
        const url = `${this.base}/oauth.access?client_id=${
          this.client_id
        }&client_secret=${this.client_secret}&code=${
          this.auth_code
        }&redirect_uri=${this.redirectUrl}`;
        return fetch(url)
          .then(results => {
            return results.json();
          })
          .then(session_data => {
            resolve(session_data);
          })
          .catch(error => {
            reject({ error });
          });
      } else if (!this.access_token && !this.auth_code) {
        this.redirectToAppLogin = true;
        reject({ type: "no_auth_code" });
      }
    });
  };
  signout = cb => {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  };
}

export default new AuthService();
