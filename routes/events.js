var express = require('express');
var router = express.Router();

/* GET events "home" page - a list of all events. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Events', style: "tables"});
});

router.get('/create', function(req, res, next) {
  res.render('eventform', { title: "Create Event", style: "newevent" });
})

router.get('/:event_id', function(req, res, next) {
  let event_id = req.params.event_id
  // GET FROM DATABASE: Select query where event_id = event_id from URL
  // For now, let's pretend
  let event_data = {event_id: event_id,
                event_name: "Opening Ceremony", 
                event_location: "auditorium", 
                event_date: "May 1 (Sat)",
                event_time: "10:30 AM",
                event_duration: "30m",
                event_type: "Main",
                event_interest: "100",
                event_description: "Be there!"}

  res.render('event', { title: "Event Details", 
                      styles: ["tables", "event"], 
                      event_id: event_id, 
                      event_data: event_data});
})

router.get('/:event_id/modify', function(req, res, next) {
  res.render('eventform', { title: "Modify Event", style: "newevent" });
})

module.exports = router;
