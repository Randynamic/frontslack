import bodyParser from "body-parser";
import compression from "compression";
import express from "express";
import morgan from "morgan";
import path from "path";
import Loadable from "react-loadable";
import cookieParser from "cookie-parser";
import cors from "cors";

import cacheLoader from "./cachedLoader";

import api_routes from "./src/services/ui";

const app = express();
const PORT = process.env.NODE_ENV === "production" ? 5000 : 3000;

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  "/api",
  cors({
    allowedHeaders: ["Content-Type", "isAuthorized"],
    exposedHeaders: [],
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: true
  })
);

app.use("/static", express.static(path.resolve(__dirname, "../build/static")));
app.use(api_routes);
app.use(cacheLoader);

Loadable.preloadAll().then(() => {
  app.listen(PORT, console.log(`App listening on port ${PORT}!`));
});

app.on("error", error => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof PORT === "string" ? "Pipe " + PORT : "Port " + PORT;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
});
