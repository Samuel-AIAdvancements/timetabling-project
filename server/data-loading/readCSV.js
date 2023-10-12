const fs = require("fs");


module.exports = { 
    readStudents: function (path) {
        const studentList = new Array();
        const text = fs.readFileSync(path).toString('utf-8');
        const textByLine = text.split("\n");
        //console.log(textByLine);
        for (var i = 1; i < textByLine.length-1; i++){
            var line = textByLine[i].split(",");
            studentList.push({
                studentID: line[0],
                name: line[1],
            })
        }
        return studentList;
    },
    readStaff: function (path) {
        const staffList = new Array();
        const text = fs.readFileSync(path).toString('utf-8');
        const textByLine = text.split("\n");
        //console.log(textByLine);
        for (var i = 1; i < textByLine.length-1; i++){
            var line = textByLine[i].split(",");
            staffList.push({
                staffID: line[0],
                name: line[1],
            })
        }
        return staffList;
    },
    readFacilities: function (path) {
        const facilityList = new Array();
        const text = fs.readFileSync(path).toString('utf-8');
        const textByLine = text.split("\n");
        //console.log(textByLine);
        for (var i = 1; i < textByLine.length-1; i++){
            var line = textByLine[i].split(",");
            facilityList.push({
                buildingNum: line[0],
                roomNum: line[1],
                roomType: line[2],
                capacity: line[3],
                longtitude: line[4],
                latitude: line[5],
            })
        }
        return facilityList;
    },
    readUnits: function (path) {
        const unitList = new Array();
        const text = fs.readFileSync(path).toString('utf-8');
        const textByLine = text.split("\n");
        
        for (var i = 1; i < textByLine.length-1; i++){
            var line = textByLine[i].split(",");
            unitList.push({
                unitID: line[0],
                unitName: line[1],
                lectureHrs: line[2],
                workshopHrs: line[3],
                tutorialHrs: line[4],
                labHrs: line[5],
            })
        }
        
        return unitList;
    },
}
