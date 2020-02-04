const WebUntis = require("webuntis");
const fs = require("fs");

// Create username.txt and password.txt yourself and put your data into it
let username = fs.readFileSync("username.txt").toString();
let password = fs.readFileSync("password.txt").toString();

const untis = new WebUntis(
  "htl1-innsbruck", // Change this value to your own school id
  username,
  password,
  "neilo.webuntis.com" // Change this value to your own webuntis subdomain
);

const days = 1; // Amount of days in the future; also works with negative numbers and 0

let currentUntisDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * days);

let finalOutputString = "Stundenplan vom " + currentUntisDate.getDate() + "." + (currentUntisDate.getMonth() + 1) +
    "." + currentUntisDate.getFullYear() + ":\n\n";

untis
  .login()
  .then(() => {
    return untis.getOwnTimetableFor(currentUntisDate);
  })
  .then(timetable => {
      let schoolStartTime = 2359;
      let schoolEndTime = 0;
    timetable.forEach(element => {
        let subjectName = element.su.values().next().value.name;
        let subjectLongName = element.su.values().next().value.longname;
        let status = element.code;
        let output = "";
        switch(status){
            case "cancelled":
                output += subjectName + " fällt aus.";
                break;
            case "irregular":
                output += subjectName + " suppliert von " + element.te.values().next().value.longname + ".";
        }
        if(status === "irregular" || status === undefined){
            if(element.startTime < schoolStartTime){
                schoolStartTime = element.startTime;
            }
            if(element.endTime > schoolEndTime){
                schoolEndTime = element.endTime;
            }
        }
        if(output){
            finalOutputString += output + "\n";
        }
    });

    if(schoolEndTime !== 0){
        schoolStartTime = schoolStartTime.toString();
        schoolStartTime = schoolStartTime.charAt(0) + ":" + schoolStartTime.charAt(1) + schoolStartTime.charAt(2);
        schoolEndTime = schoolEndTime.toString();
        schoolEndTime = schoolEndTime.charAt(0) + schoolEndTime.charAt(1) + ":" + schoolEndTime.charAt(2) + schoolEndTime.charAt(3);
        finalOutputString += "\nSchulstart um " + schoolStartTime + ".\n";
        finalOutputString += "Schulende um " + schoolEndTime + ".";
    } else {
        finalOutputString += "\nKein Unterricht."
    }
    console.log(finalOutputString);
  });
