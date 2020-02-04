const WebUntis = require("webuntis");
const fs = require("fs");

let username = fs.readFileSync("username.txt").toString();
let password = fs.readFileSync("password.txt").toString();

const untis = new WebUntis(
    "htl1-innsbruck",
    username,
    password,
    "neilo.webuntis.com"
);
