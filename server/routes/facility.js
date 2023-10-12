const express = require("express");

// facilityRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /facility.
const facilityRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the facilitys.
facilityRoutes.route("/facility").get(function (req, res) {
  let db_connect = dbo.getDb("university");
  db_connect
    .collection("facility")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single facility by id
facilityRoutes.route("/facility/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("facility")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you create a new facility.
facilityRoutes.route("/facility/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    buildingNum: req.body.buildingNum,
    roomNum: req.body.roomNum,
    roomType: req.body.roomType,
    capacity: req.body.capacity,
    longtitude: req.body.longtitude,
    latitude: req.body.latitude,
  };
  db_connect.collection("facility").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a facility by id.
facilityRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  let newvalues = {
    $set: {
      name: req.body.name,
      facilityID: req.body.facilityID,
    },
  };
  db_connect
    .collection("facility")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a facility
facilityRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("facility").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

module.exports = facilityRoutes;
