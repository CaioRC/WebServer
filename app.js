const http = require('http');
const express = require('express');
// const InitiateMongoServer = require("./config/db");

// //Iniciar o Mongo Server
// InitiateMongoServer();


const app = require('./config/express')();

http.createServer(app).listen(app.get("port") , () => {
    console.log("Servidor Express escutando na porta " + app.get("port"));
}
);