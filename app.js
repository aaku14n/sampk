import express from "express";
import path from "path";
import React from "react";
import { Provider } from "react-redux";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";

import Loadable from "react-loadable";
import { getBundles } from "react-loadable-ssr-addon";
import App from "./src/App";
import store from "./src/configureStore";
import fs from "fs";
import Helmet from "react-helmet";
import { matchRoutes } from "react-router-config";
import Routes from "./src/Route";
// const helmet = require("helmet");

const manifest = require("./dist/react-loadable-ssr-addon.json");

const server = express();

server.use(
  "/robots.txt",
  express.static(path.join(__dirname, "public/robots.txt"))
);
server.use(
  "/sitemap.xml",
  express.static(path.join(__dirname, "public/sitemap.xml"))
);
server.use(
  "/manifest.json",
  express.static(path.join(__dirname, "public/manifest.json"))
);

server.use("/assets", express.static(path.join(__dirname, "public/assets")));

server.get("*.js", function(req, res, next) {
  if (req.url !== "/service-worker.js") {
    let url = req.url.split("?");
    let gipVersionFile = "/dist" + url[0] + ".gz";
    if (fs.existsSync(__dirname + gipVersionFile)) {
      req.url = gipVersionFile + "?" + url[1];
      res.set("Content-Encoding", "gzip");
    } else {
      req.url = "/dist" + req.url;
    }
  } else {
    req.url = "/dist" + req.url;
  }
  res.set("Content-Type", "application/javascript");
  next();
});

server.get("*.css", function(req, res, next) {
  let url = req.url.split("?");
  let gipVersionFile = "/dist" + url[0] + ".gz";
  if (fs.existsSync(__dirname + gipVersionFile)) {
    req.url = gipVersionFile + "?" + url[1];
    res.set("Content-Encoding", "gzip");
  } else {
    req.url = "/dist" + req.url;
  }
  next();
});
server.use("/dist", express.static(path.join(__dirname, "dist")));

server.get("*", async (req, res) => {
  const actionsTemp = matchRoutes(Routes, req.path).map(({ route }) => {
    return !route.component.preload
      ? route.component
      : route.component.preload().then(res => res.default);
  });

  const loadedActions = await Promise.all(actionsTemp);
  const actions = loadedActions
    .map(component => {
      return component.fetching
        ? component.fetching({ ...store, path: req.path })
        : null;
    })
    .map(
      async actions =>
        await Promise.all(
          (actions || []).map(
            p => p && new Promise(resolve => p.then(resolve).catch(resolve))
          )
        )
    );

  await Promise.all(actions);
  const modules = new Set();
  const html = renderToString(
    <Loadable.Capture report={moduleName => modules.add(moduleName)}>
      <Provider store={store}>
        <StaticRouter location={req.url} context={{}}>
          <App />
        </StaticRouter>
      </Provider>
    </Loadable.Capture>
  );
  const helmet = Helmet.renderStatic();
  const bundles = getBundles(manifest, [
    ...manifest.entrypoints,
    ...Array.from(modules)
  ]);

  const styles = bundles.css || [];
  const scripts = bundles.js || [];
  res.send(`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="theme-color" content="#db5945">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="manifest" href="/manifest.json">
        ${
          helmet.title ? (
            helmet.title.toString()
          ) : (
            <title>React Boilerplate</title>
          )
        }
        ${helmet.meta.toString()}
        ${styles
          .map(style => {
            return `<link href="/${style.file}" rel="stylesheet" defer/>`;
          })
          .join("\n")}
      </head>
      <body style="margin:0px">
        <div id="root">${html}</div>
        <div id="service-worker-toast-root"></div>
        <noscript>Your browser does not support JavaScript!</noscript>
        <script>
        window.INITIAL_STATE = ${JSON.stringify(store.getState())}
      </script>
        ${scripts
          .map(script => {
            return `<script src="/${script.file}" defer></script>`;
          })
          .join("\n")}
         
      </body>
    </html>
  `);
});

Loadable.preloadAll()
  .then(() => {
    server.listen(3000, () => {
      console.log("Running on http://localhost:3000/");
    });
  })
  .catch(err => {
    console.log(err);
  });
