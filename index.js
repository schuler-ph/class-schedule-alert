const WebUntis = require("webuntis");
const fs = require("fs");

// Create username.txt and password.txt yourself and put your data into it
let username = fs.readFileSync("username.txt").toString();
let password = fs.readFileSync("password.txt").toString();

const untis = new WebUntis(
  "htl1-innsbruck",
  username,
  password,
  "neilo.webuntis.com"
);

let currentUntisDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
let finalOutput;

finalOutput = "Stundenplan vom " + currentUntisDate.getDate() + "." + (currentUntisDate.getMonth() + 1) + "." +
    currentUntisDate.getFullYear() + ":\n";

untis
  .login()
  .then(() => {
    return untis.getOwnTimetableFor(currentUntisDate);
  })
  .then(timetable => {
      let schoolEndTime = 0;
    timetable.forEach(element => {
        let subjectName = element.su.values().next().value.name;
        let status = element.code;
        let output = "";
        switch(status){
            case "cancelled":
                output += subjectName + " fällt aus.";
                break;
            case "irregular":
                output += subjectName + " wird suppliert von " + element.te.values().next().value.longname + ".";
        }
        if(status === "irregular" || status === undefined){
            if(element.endTime > schoolEndTime){
                schoolEndTime = element.endTime;
            }
        }
        if(output){
            finalOutput += output + "\n";
        }
    });
    schoolEndTime = schoolEndTime.toString();
    schoolEndTime = schoolEndTime.charAt(0) + schoolEndTime.charAt(1) + ":" + schoolEndTime.charAt(2) + schoolEndTime.charAt(3);
    finalOutput += "Schulende um " + schoolEndTime;
    console.log(finalOutput);
  });
