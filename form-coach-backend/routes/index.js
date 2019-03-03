var express = require("express");
var router = express.Router();
var moment = require("moment");
var Firestore = require("@google-cloud/firestore");

const firestore = new Firestore({
  projectId: "formcoach",
  keyFilename: "bin/FormCoach-Key.json"
});

/* GET list of captures */
router.get("/", function(req, res, next) {
  output_data = {};

  firestore
    .collection("captures")
    .get()
    .then(query =>
      query.forEach(data => {
        output_data[data.id] = data.data();
        output_data[data.id]["id"] = data.id;
      })
    )
    .then(() => {
      output_data["length"] = Object.keys(output_data).length;
      res.json(output_data);
    })
    .catch(e => next(e));
});

/* GET all data about a capture */
router.get("/capture/:cid", function(req, res, next) {
  output_data = {};

  firestore
    .collection("captures")
    .doc(req.params.cid)
    .get()
    .then(capture => {
      if (capture.exists) {
        output_data = capture.data();
        output_data["id"] = capture.id;

        output_data["actions"] = {};

        return firestore
          .collection("captures")
          .doc(capture.id)
          .collection("action")
          .get()
          .then(query =>
            query.forEach(data => {
              output_data["actions"][data.id] = data.data();
              output_data["actions"][data.id]["id"] = data.id;
            })
          );
      } else {
        return Promise.reject("Capture ID does not exist.");
      }
    })
    .then(() => {
      output_data["actions"]["length"] = Object.keys(
        output_data["actions"]
      ).length;
      res.json(output_data);
    })
    .catch(e => next(e));
});

/* POST to create a new capture */
router.post("/capture", function(req, res, next) {
  firestore
    .collection("captures")
    .add({
      count: 0,
      date: moment().toDate(),
      sport: req.body.sport
    })
    .then(docRef => {
      res.json({ id: docRef.id });
    })
    .catch(e => {
      next(e);
    });
});

/* POST to create a new action */
router.post("/capture/:cid", function(req, res, next) {
  var capture_query = firestore.collection("captures").doc(req.params.cid);

  var count = 0;

  capture_query
    .collection("action")
    .add({
      action_data: JSON.parse(req.body.data)
    })
    .then(docRef => {
      return capture_query
        .get()
        .then(capture => (count = capture.data().count))
        .then(() => docRef);
    })
    .then(docRef => {
      return capture_query.update({ count: count + 1 }).then(() => docRef);
    })
    .then(docRef => {
      res.json({ id: docRef.id });
    })
    .catch(e => {
      next(e);
    });
});

module.exports = router;
