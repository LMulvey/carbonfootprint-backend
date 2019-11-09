const SQLQuery = require('./sql.js');

module.exports = function () {

};

// When register, it works like this
//
// register().then().insertUser().then().getUserID().then().createProfile()

module.exports.register = function (username, pwd, callback) {
  var status = -1;
  var query = "INSERT INTO public.registry (username,password) VALUES ('" + username + "','" + pwd + "');";
  SQLQuery(query, function (err, res) {
    if (err) {
      status = 0;
      callback(status);
    } else {
      status = 1;
      insertUser( username, callback);
    }
  });
};

var insertUser = function (username, callback) {
  var status = -1;
  var query = "INSERT INTO public.user (username, email) VALUES ('" + username + "', '" + email + "');";
  SQLQuery(query, function (err, res) {
    if (err) {
      status = 0;
      callback(status);
    } else {
      status = 1;
      getUserID(username, callback);
    }
  });
};

var getUserID = function (username, callback) {
  var status = -1;
  var query = "SELECT user_id FROM public.user where username='" + username + "';";
  var userID;
  SQLQuery(query, function (err, res) {
    if (err) {
      status = 0;
      callback(status);
    } else {
      status = 1;
      userID = res.rows[0].user_id;
    }
  });
};


module.exports.login = function (username, pwd, callback) {
  var status = -1;
  var query = "SELECT password FROM public.registry where username='" + username + "';";

  SQLQuery(query, function (err, res) {
    if (err) {
      status = 0;
      callback(status);
    } else {
      status = 1;
      callback(status, res);
    }
  });
};


