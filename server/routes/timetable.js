const express = require("express");

const generateTimetable = require("../generateTimetable.js");

const timetableRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

timetableRoutes.post("/timetable/shift", (req, res) => {
  const { timetable, slotX, slotY, newSlotX, newSlotY } = req.body;

  //No Timetable
  if (!timetable || timetable.length === 0) {
    return res.status(400).json({ error: 'timetable is required' });
  }

  //Out of Bounds
  if (
    slotX < 0 || slotX >= timetable.length ||
    newSlotX < 0 || newSlotX >= timetable.length ||
    slotY < 0 || slotY >= timetable[0].length ||
    newSlotY < 0 || newSlotY >= timetable[0].length
  ) {
    return res.status(400).json({ error: 'Invalid slot indexes provided' });
  }

  //New Slot Occupied
  if (timetable[newSlotX][newSlotY] !== null) {
    return res.status(400).json({ error: 'new slot is occupied'});
  }

  //Moving Null Slot
  if (timetable[slotX][slotY] === null) {
    return res.status(400).json({ error: 'moving null slot'});
  }

  // Move the slot value to the new position
  timetable[newSlotX][newSlotY] = timetable[slotX][slotY];
  // Set the old slot position to null
  timetable[slotX][slotY] = null;

  
  res.status(200).json({ updatedTimetable: timetable });
});

timetableRoutes.post("/timetable/moveToFirstAvailable", (req, res) => {
  const { timetable, slotX, slotY } = req.body;

  // Check for Timetable
  if (!timetable || timetable.length === 0) {
    return res.status(400).json({ error: 'timetable is required' });
  }

  // Out of Bounds
  if (
    slotX < 0 || slotX >= timetable.length ||
    slotY < 0 || slotY >= timetable[0].length
  ) {
    return res.status(400).json({ error: 'Invalid slot indexes provided' });
  }

  // Null Slot
  if (timetable[slotX][slotY] === null) {
    return res.status(400).json({ error: 'moving null slot'});
  }

  // Find first Available Slot
  for (let i = 0; i < timetable.length; i++) {
    for (let j = 0; j < timetable[i].length; j++) {
      if (timetable[i][j] === null) {
        // Move the slot value to the first available position
        timetable[i][j] = timetable[slotX][slotY];
        // Set the old slot position to null
        timetable[slotX][slotY] = null;

        return res.status(200).json({ updatedTimetable: timetable }); // Return the updated timetable
      }
    }
  }

  // No Available Slot
  return res.status(400).json({ error: 'No available slot'});
});

//If ID exists overrides - otherwises creates new document
timetableRoutes.post("/timetable/save", (req, res) => {
  const { timetable, id } = req.body;

  if (!timetable || timetable.length === 0) {
      return res.status(400).json({ error: 'timetable is required' });
  }

  if (!id) {
      return res.status(400).json({ error: 'id is required' });
  }

  let db_connect = dbo.getDb();
  
  db_connect.collection("timetables").replaceOne(
      { _id: id },
      { _id: id, timetable: timetable },
      { upsert: true }, // create the object if no document is found
      (error, result) => {
          if (error) {
              return res.status(500).json({ error: 'An error occurred while saving the timetable' });
          }
          if (result.upsertedCount > 0) {
              return res.status(201).json({ message: `timetable created successfully with id: ${id}` });
          } else {
              return res.status(200).json({ message: `timetable updates successfully with id: ${id}` });
          }
      }
  );
});

timetableRoutes.get("/timetable/load/:id", (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'id is required' });
  }

  let db_connect = dbo.getDb();
  db_connect.collection("timetables").findOne({ _id: id }, (error, result) => {
    if (error) {
      return res.status(500).json({ error: 'An error occurred while loading the timetable' });
    }
    
    if (!result) {
      return res.status(404).json({ error: 'No timetable found with the provided id' });
    }

    return res.status(200).json({ timetable: result.timetable });
  });
});

module.exports = timetableRoutes;