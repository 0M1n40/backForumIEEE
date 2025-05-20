require("dotenv").config();
const express = require("express");
console.log("Iniciando o servidor...");

const app = express();
const port = process.env.SERVER_PORT;
const host = process.env.SERVER_HOST;

app.listen(port, host,() =>{
    console.log("server status: ON");
});