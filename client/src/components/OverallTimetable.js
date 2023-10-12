import React, { useState, useMemo } from 'react';
import './OverallTimetable.css'

var roomList = ['314.101', '314.102', '314.103', '314.104', '314.105', '314.106', '314.107', '314.108', '314.109',
'314.201', '314.202', '314.203', '314.204', '314.205', '314.206', '314.207', '314.208', '314.209', '314.210', '314.301',
'314.301', '314.302', '314.303', '314.304', '401.101', '401.102', '401.103', '405.101', '405.102', '406.101', '406.102',
'406.103', '406.201', '406.202', '408.101', '408.102', '408.103', '408.201', '408.202', '408.301'];

const msg = ["<b>Successfull Room Booking</b>", "<b>Soft constraint violated:</b>", "<b>Hard constraint violated:</b>"];
const icons = ["✅", "⚠️", "❌"];
const colorClasses = ["white", "green", "blue", "red"];
const units = ["DSA", "ISE", "UCP", "PDI", "MAD", "FOP"];
const roomTypes = ["Lecture", "Computer Lab", "Tutorial"];
const constraints = ["Overlapping Lecture", "Back to Back Classes", "Lecturer Preference"];
const constraintsRed = ["Multiple room bookings", "Staff double booked"];

function pickRandom(arr) {
    const idx = Math.floor(Math.random() * arr.length);
    return arr[idx];
}

function generateAdditionalInfo(colorIndex) {
    let info = '';
    if (colorIndex === 1) {
        info = ` <br>${icons[colorIndex-1]} ${pickRandom(units)}-${pickRandom(roomTypes)}`;
        
    } 
    if (colorIndex === 2) {
        info += `  ${pickRandom(constraints)} <br>${icons[colorIndex-1]} ${pickRandom(units)}-${pickRandom(roomTypes)}`;
    }
    else if (colorIndex === 3) {
        const constraint = pickRandom(constraintsRed);
        if (constraint === "Multiple room bookings") {
            info = ` ${icons[colorIndex-1]} ${pickRandom(units)}-${pickRandom(roomTypes)}<br/> ${icons[colorIndex-1]} ${pickRandom(units)}-${pickRandom(roomTypes)}`;
        } else {
            info = ` ${icons[colorIndex-1]} ${pickRandom(units)}-${pickRandom(roomTypes)}`;
        }
        info = `${constraint}<br>` + info;
    }
    return info;
}

function generateTimetable() {
    let timetable = [];
    for (let i = 0; i < 60; i++) {
        let row = [];
        for (let j = 0; j < roomList.length; j++) {
            let r = Math.random();
            let colorIndex = 0;
            if (r < 0.4) colorIndex = 0;
            else if (r < 0.7) colorIndex = 1;
            else if (r < 0.9) colorIndex = 2;
            else colorIndex = 3;
            row.push({ colorIndex, additionalInfo: generateAdditionalInfo(colorIndex) });
        }
        timetable.push(row);
    }
    return timetable;
}

const OverallTimetable = () => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const periods = new Array(12).fill('');

    const [popupMessage, setPopupMessage] = useState('');
    const timetable = useMemo(() => generateTimetable(), []);

    const handleClick = slot => {
        if (slot.colorIndex !== 0) {
            setPopupMessage(`${msg[slot.colorIndex - 1]} ${slot.additionalInfo}`);
        } else {
            setPopupMessage('');
        }
    };

    return (
        <div className="center">
            <table>
                <thead>
                    <tr>
                        <th style={{width: '30px'}}>Days/Rooms</th> 
                        {roomList.map((room, index) => <th key={index}>{room}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {days.map((day, dayIndex) =>
                        periods.map((_, periodIndex) => (
                            <tr key={`${dayIndex}${periodIndex}`}>
                                {periodIndex === 0 && <td rowSpan={12} style={{width: '100px'}}>{day}</td>}
                                {roomList.map((room, roomIndex) => {
                                     const slot = timetable[dayIndex * periods.length + periodIndex][roomIndex];
                                     const colorClass = colorClasses[slot.colorIndex];
                                     return (
                                         <td
                                             key={room}
                                             className={colorClass}
                                             onClick={() => handleClick(slot)}
                                         >
                                         </td>
                                     );
                                })}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            {popupMessage && <div className="popup" dangerouslySetInnerHTML={{ __html: popupMessage }} />}
        </div>
    );
};

export default OverallTimetable;