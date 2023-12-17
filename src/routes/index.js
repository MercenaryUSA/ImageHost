const express = require("express");
const router = express.Router();
const controller = require("../controller/controller");

let routes = (app) => {
  router.post("/upload", controller.upload);
  router.get("/files", controller.getListFiles);
  router.get("/files/:name", controller.download);
  router.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.use(router);
};

module.exports = routes;