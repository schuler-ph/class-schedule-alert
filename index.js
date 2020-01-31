const WebUntis = require("webuntis");
const fs = require("fs")

let username = fs.readFileSync("username.txt").toString();
let password = fs.readFileSync("password.txt").toString();

const untis = new WebUntis(
  "htl1-innsbruck",
  username,
  password,
  "neilo.webuntis.com"
);

let currentUntisDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * 0);

untis
  .login()
  .then(() => {
    return untis.getOwnClassTimetableFor(currentUntisDate);
  })
  .then(timetable => {
    timetable.forEach(element => console.log(element));
  });
