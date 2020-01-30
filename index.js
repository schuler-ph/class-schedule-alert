const WebUntis = require("webuntis");

const untis = new WebUntis(
  "htl1-innsbruck",
  "philipp.schuler",
  "shufflelp123$%&",
  "neilo.webuntis.com"
);

let currentUntisDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * 5);

console.log(untis.convertDateToUntis(currentUntisDate));

untis
  .login()
  .then(() => {
    return untis.getClasses();
  })
  .then(classes => {
    // classes.forEach(element => console.log(element));
  });
