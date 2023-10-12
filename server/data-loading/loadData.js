const readCSV = require("./readCSV.js");

const studentList = readCSV.readStudents("./data/Students.csv");
const staffList = readCSV.readStaff("./data/Staff.csv");
const facilityList = readCSV.readFacilities("./data/Facilities.csv");
const unitList = readCSV.readUnits("./data/Units.csv");
const request = require('request');


//async function printTimetable(){
  //  const response = await fetch(`http://localhost:5000/timetable/random`);
    //console.log(response);
//}
printTimetable();
//Add Students to Database
// for (var i=0; i < studentList.length; i++) {
//     request.post(
//         'http://localhost:5000/student/add',
//         { json: { name: studentList[i].name, studentID: studentList[i].studentID } },
//         function (error, response, body) {
//             if (!error && response.statusCode == 200) {
//                 console.log(body);
//             }
//         }
//     );
// }

// //Add Staff to Database
// for (var i=0; i < staffList.length; i++) {
//     request.post(
//         'http://localhost:5000/staff/add',
//         { json: { name: staffList[i].name, staffID: staffList[i].staffID } },
//         function (error, response, body) {
//             if (!error && response.statusCode == 200) {
//                 console.log(body);
//             }
//         }
//     );
// }

// //Add Facilites to Database
// for (var i=0; i < facilityList.length; i++) {
//     request.post(
//         'http://localhost:5000/facility/add',
//         { json: {
//             buildingNum: facilityList[i].buildingNum, 
//             roomNum: facilityList[i].roomNum,
//             roomType: facilityList[i].roomType,
//             capacity: facilityList[i].capacity,
//             longtitude: facilityList[i].longtitude,
//             latitude: facilityList[i].latitude,

//         }},
//         function (error, response, body) {
//             if (!error && response.statusCode == 200) {
//                 console.log(body);
//             }
//         }
//     );
// }

// //Add Units to Database
// for (var i=0; i < unitList.length; i++) {
//     request.post(
//         'http://localhost:5000/unit/add',
//         { json: {
//             unitID: unitList[i].unitID,
//             unitName: unitList[i].unitName,
//             lectureHrs: unitList[i].lectureHrs,
//             workshopHrs: unitList[i].workshopHrs,
//             tutorialHrs: unitList[i].tutorialHrs,
//             labHrs: unitList[i].labHrs,

//         }},
//         function (error, response, body) {
//             if (!error && response.statusCode == 200) {
//                 console.log(body);
//             }
//         }
//     );
// }