const express = require("express");

// unitRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /unit.
const unitRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the units.
unitRoutes.route("/unit").get(function (req, res) {
  let db_connect = dbo.getDb("university");
  db_connect
    .collection("unit")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single unit by id
unitRoutes.route("/unit/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("unit")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you create a new unit.
unitRoutes.route("/unit/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    unitID: req.body.unitID,
    unitName: req.body.unitName,
    lectureHrs: req.body.lectureHrs,
    workshopHrs: req.body.workshopHrs,
    tutorialHrs: req.body.tutorialHrs,
    labHrs: req.body.labHrs,
  }; 
  db_connect.collection("unit").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a unit by id.
unitRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  let newvalues = {
    $set: {
      name: req.body.name,
      unitID: req.body.unitID,
    },
  };
  db_connect
    .collection("unit")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a unit
unitRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("unit").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

module.exports = unitRoutes;
