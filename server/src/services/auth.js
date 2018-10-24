const express = require("express");
const axios = require("axios");

express.Router();
const api_auth_routes = express.Router();

api_auth_routes.get("/api/auth/getToken", (req, res) => {
  const PORT = process.env.NODE_ENV === "production" ? 5000 : 3000;
  const redirectUrl = `http://localhost:${PORT}/auth/getToken`;
  const client_id = "265156972019.453766114196";
  const client_secret = "0b50651557a6545be43add555ba6f830";
  const base = "https://slack.com/api";
  const code = req.query.code;
  const url = `${base}/oauth.access?client_id=${client_id}&client_secret=${client_secret}&code=${code}&redirect_uri=${redirectUrl}`;
  axios(url)
    .then(result => {
      if (!result.data.ok) {
        res.json({ ok: false, error: result });
      } else {
        res.json(result.data);
      }
    })
    .catch(e => {
      res.json({ ok: false, error: e });
    });
});

module.exports = api_auth_routes;
