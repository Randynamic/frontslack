import express from "express";

express.Router();
const api_routes = express.Router();

api_routes.get("/api/menus", (req, res) => {
  const links = {
    privateLinks: [],
    publicLinks: []
  };
  if (req.header("isAuthorized") === "true") {
    links.privateLinks = [
      {
        to: "/",
        text: "Homepage"
      },
      {
        to: "/dashboard",
        text: "Dashboard",
        auth: true
      },
      {
        to: "/logout",
        text: "Logout",
        auth: true
      }
    ];
  }
  links.publicLinks = [
    {
      to: "/",
      text: "Homepage"
    },
    {
      to: "/about",
      text: "About"
    },
    {
      to: "/profile/1",
      text: "Profile 1"
    },
    {
      to: "/profile/2",
      text: "Profile 2"
    },
    {
      to: "/login",
      text: "Login",
      auth: false
    },
    {
      to: "/dashboard",
      text: "Dashboard",
      auth: true
    },
    {
      to: "/logout",
      text: "Logout",
      auth: true
    },
    {
      to: "/this-is-broken",
      text: "Broken Page"
    }
  ];

  res.json({ ok: true, data: links });
});

export default api_routes;
