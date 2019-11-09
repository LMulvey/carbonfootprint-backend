var express = require('express');
var router = express.Router();
var Query = require('../actions.js');
var Getter =  require('../lib/getters.js');
var Setter = require('../lib/setters.js');


/* GET users listing. */
router.get('/register', function (req, res, next) {
  res.render('register', {title: 'Register'});
});

router.get('/login', function (req, res, next) {
  res.render('login', {title: 'Login'});
});



router.post('/register', function (req, res) {
  var pwd = req.body.pwd;
  var username =  req.body.username;

  Query.register(username, pwd, function (status) {

    if (status === 1) {
      console.log('username is: ', username, 'password is:', pwd);
      res.send('Registry successfully');
    } else {
      res.send('Registry failed');
    }
  });

});


router.post('/login', function (req, res) {
  var username = req.body.username;
  var pwd = req.body.pwd;
  var sqlpwd;

  Query.login(username, pwd, function (status, sqlres) {
    if (status === 1) {

      if (sqlres.rows.length === 0) {
        res.send('Account does not exist');
      } else {
        sqlpwd = sqlres.rows[0].password;
        console.log('username:', username, 'password:', pwd, 'query password:', sqlpwd);
        if (pwd === sqlpwd) {
          res.send('Login success');
        } else {
          res.send('Password is not correct');
        }
      }
    } else {
      res.send('Login failed');
    }
  });

});

module.exports = router;
