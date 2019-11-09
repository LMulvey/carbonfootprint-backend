const SQLQuery = require('../sql.js');

module.exports = function () {

};


//GETTERS

module.exports.getUser = function (userID, callback) {
  var status = -1;
  var query = "SELECT * FROM public.user where user_id='" + userID + "';";

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

module.exports.getRegistry = function (username, callback) {
  var status = -1;
  var query = "SELECT * FROM public.registry where username='" + username + "';";

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

