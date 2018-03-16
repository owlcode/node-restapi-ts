import express = require("express");
import { Server } from "./src/server";
import {PORT} from './settings';

let port = PORT;
let api = new Server(express(), port);
api.run();
console.info(`listening on ${port}`);

module.exports = api;