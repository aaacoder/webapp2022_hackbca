var express = require('express');
var router = express.Router();
const {requireAuth} = require('express-open-id-connect');

/* GET home page. */
router.get('/', function(req, res, next) {
  let username = "";
  if (req.oidc.isAuthenticated())
    username = req.oidc.user.name;
  res.render('index', { title: 'HackBCA 20XX' + username
  , style: "index" });
});

router.get('/profile', requireAuth(), (req, res) => {
  res.send(req.oidc.user);
})

module.exports = router;
