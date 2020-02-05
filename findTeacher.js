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

let classes = "522 523 524 525 526 527 528 529 530 531 532 533 534 535 536 537 538 539 540 541 542 543 544 545 546 547 548 549 550 551 552 553 554 555 556 557 558 559 560 561 562 563 564 565 566 567 568 569 570 571 572 573 574 575 576 577 578 579 580 581 582 583 584 585 586 587 588 589 590 650 651 652 653 654 655 656 657 658 659 660 662 663 664 665"
// 3AHWII = 526
classes = classes.split(' ');
let currentUntisTime = new Date();
currentUntisTime = currentUntisTime.getHours().toString() + currentUntisTime.getMinutes().toString();
let currentLessonStarttime = 0;

let starttimes = "800 850 955 1045 1140 1230 1320 1410 1515 1605 1655 1800";
starttimes = starttimes.split(' ');

starttimes.forEach(element => {
    if(element < currentUntisTime){
        currentLessonStarttime = element;
    }
});

console.log(currentLessonStarttime);

/*
untis.login().then(() => {
    return untis.getClassTimetableForToday(526);
}).then(timetable => {
    timetable.forEach(element => {
        if(currentLessonStarttime.toString() === element.startTime.toString()){
            console.log(element);
        }
    });
    }
);
*/

let className = "";
let teacherName = "";
let roomName = "";

classes.forEach(element => {

    untis.login().then(() => {
        return untis.getClassTimetableForToday(element);
    }).then(timetable => {
        timetable.forEach(element => {
            if(currentLessonStarttime.toString() === element.startTime.toString()){
                className = element.kl.values().next().value.name;
                teacherName = element.te.values().next().value.longname;
                roomName = element.ro.values().next().value.name;
                console.log("Klasse: " + className + "; Proffessor: " + teacherName + "; Raum: " + roomName);
            }
        });
    })
    }
);