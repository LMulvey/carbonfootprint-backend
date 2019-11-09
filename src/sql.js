// connect with PostgresSQL
const pg = require('pg');


// Database config
const config = {
  user: "kdxqdnrgeidzud",
  database: "d4g72o4s60v6i4",
  password: process.env.DB_password,
  host: "ec2-107-21-120-104.compute-1.amazonaws.com",
  port: 5432,
  ssl: true,

  // extended attributes
  poolSize: 5,
  poolIdleTimeout: 30000,
  reapIntervalMillis: 10000
};

const pool = new pg.Pool(config);


pool.connect(function (isErr, client, done) {
  if (isErr) {
    console.log('Connect query:' + isErr.message);
    return;
  }
  client.query('select now();', [], function (isErr, rst) {
    done();
    if (isErr) {
      console.log('Query error:' + isErr.message);
    } else {
      console.log('Query success, data is: ' + rst.rows[0].now);
    }
  })
});

const SQLQuery = function (sql, callback) {
  pool.query(sql, (err, res) => {
    callback(err, res);

    if (err) {
      console.log('Query error:', err.message);
    } else {
      //console.log('Query return:', res.rows);
    }
  });
};


pool.on("error", function (err, client) {
  console.log("error --> ", err)
});

pool.on('acquire', function (client) {
  //console.log("acquire Event")
});

pool.on('connect', function () {
  //console.log("connect Event")
});


module.exports = SQLQuery;