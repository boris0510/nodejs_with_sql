// DataBase
const mysql = require('mysql');

// DataBase Config
const mysqlConfig = require('../config/mysqlConfig');

function query() {
  return new Promise((resolve, reject) => {
    const mysqlPool = mysql.createPool(mysqlConfig);
    mysqlPool.getConnection((error, connection) => {
      if (error) {
        console.log(error);
        reject(error);
        connection.release();
        return;
      }
      const mysqlQuery = 'SELECT * FROM user';
      connection.query(mysqlQuery, (error, result) => {
        if (error) {
          console.log(error);
          reject(error);
          connection.release();
          return;
        }
        resolve(result);
        connection.release();
      });
    });
  });
}

module.exports = query;