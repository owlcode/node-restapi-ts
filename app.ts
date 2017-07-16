import express = require("express");
import { Server } from "./server";

let port = 3001;
let api = new Server(express(), port);
api.run();
console.info(`listening on ${port}`);

module.exports = api;