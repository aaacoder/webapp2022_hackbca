var express = require('express');
var router = express.Router();
var db = require('../db/db')

const fs = require('fs');
const path = require('path');

let eventsQuery = fs.readFileSync(path.join(__dirname, "../db/select_events.sql"));

/* GET events "home" page - a list of all events. */
router.get('/', async function(req, res, next) {
  // let promise = db.queryPromise(eventsQuery)
  
  // promise.then((results) => {
  //   res.render('index', { title: 'Events', style: "tables", events: results});
  // }).catch((err) => {
  //   next(err);
  // });
  
  try {
    let results = await db.queryPromise(eventsQuery)
    console.log(results)
    res.render('index', { title: 'Events', style: "tables", events: results});
  } catch (err) {
    next(err);
  }

});

router.get('/create', function(req, res, next) {
  res.render('eventform', { title: "Create Event", style: "newevent" });
})

let singleEventQuery = fs.readFileSync(path.join(__dirname, "../db/select_events_single.sql"));

router.get('/:event_id', function(req, res, next) {
  let event_id = req.params.event_id
  // GET FROM DATABASE: Select query where event_id = event_id from URL
  // For now, let's pretend
  // let event_data = {event_id: event_id,
  //               event_name: "Opening Ceremony", 
  //               event_location: "Auditorium", 
  //               event_date: "May 1 (Sat)",
  //               event_time: "10:30 AM",
  //               event_duration: "30m",
  //               event_type: "Main",
  //               event_interest: "100",
  //               event_description: "Be there!"}

  db.query(singleEventQuery, [event_id], (err, results) => {
    if (err)
      next(err);
    console.log(results);
    let event_data = results[0]
    res.render('event', { title: "Event Details", 
      styles: ["tables", "event"], 
      event_id: event_id, 
      event_data: results});
  })
})

router.get('/:event_id/modify', function(req, res, next) {
  res.render('eventform', { title: "Modify Event", style: "newevent" });
})

module.exports = router;
