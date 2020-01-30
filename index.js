const WebUntis = require("webuntis");
const fs = require("fs")

let pw;

fs.readFile("pw.txt", 
function(err, buf) {
  console.log(buf.toString());
}
);

console.log(pw);

const untis = new WebUntis(
  "htl1-innsbruck",
  "philipp.schuler",
                                                                                                                                                                                                                            "shufflelp123$%&",
  "neilo.webuntis.com"
);

let currentUntisDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * 0);
let currentWeekday = (new Date()).getDay();
console.log(currentWeekday);

// console.log(untis.convertDateToUntis(currentUntisDate));

untis
  .login()
  .then(() => {
    return untis.getOwnClassTimetableFor(currentUntisDate);
  })
  .then(timetable => {
    timetable.forEach(element => console.log(element));
  });
