const SQLQuery = require('../sql.js');
const Getter = require('./getters.js');

module.exports = function () {

};

String.prototype.format = function () {
  if (arguments.length === 0) return this;
  var obj = arguments[0];
  var s = this;
  for (var key in obj) {
    s = s.replace(new RegExp("\\{" + key + "\\}", "g"), obj[key]);
  }
  return s;
};

//SETTERS

//Example
module.exports.setUser = function (user_id, username, callback) {
  var _username;

  Getter.getUser(user_id, function (status, getres) {
    if (status === 0) {
      //return -1 means unknown sql query error
      callback(-1);
    }
    if (status === 1) {
      if (getres.rows.length === 0) {
        //return 0 means this user does not exist
        callback(0);
      } else {
        (!username) ? _username = getres.rows[0].username : _username = username;

        var data = {
          username: _username,
          user_id: user_id
        };
        var query = "UPDATE public.user SET username = '{username}' WHERE user_id =" + " '{user_id}'".format(data);
        console.log(query);
        SQLQuery(query, function (err, res) {
          if (err) {
            status = -1;
            callback(status);
          } else {
            status = 1;
            callback(status, res);
          }
        });
      }
    }
  });
};

module.exports.setRegistry = function (username, password, callback) {
  var _username, _password;

  Getter.getRegistry(username, function (status, getres) {
    if (status === 0) {
      //return -1 means unknown sql query error
      callback(-1);
    }
    if (status === 1) {
      if (getres.rows.length === 0) {
        //return 0 means this user does not exist
        callback(0);
      } else {
        (!password) ? _password = getres.rows[0].pwd : _password = password;

        var data = {
          username: _username,
          password: _password
        };
        var query = "UPDATE public.registry SET pwd = '{password}' WHERE username =" + " '{username}'".format(data);
        SQLQuery(query, function (err, res) {
          if (err) {
            //return -1 means unknown sql query error
            status = -1;
            callback(status);
          } else {
            status = 1;
            callback(status, res);
          }
        });
      }
    }
  });
};