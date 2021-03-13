const express = require('express');
const bodyParser = require('body-parser');
const alunosRouter = require('../routes/alunos');
const campusRouter = require('../routes/campi');
const cors = require('cors');

module.exports = () => {
  const app = express();
  app.use(cors());
  app.set("port", 8080);
  app.use(bodyParser.json());
  //app.use(bodyParser.urlencoded)({ extended: false });
  alunosRouter(app);
  campusRouter(app);
  return app;
};
