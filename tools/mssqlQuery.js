// DataBase
const mssql = require('mssql');

// DataBase Config
const mssqlConfig = require('../config/mssqlConfig');

function query() {
  return new Promise((resolve, reject) => {
    mssql.connect(mssqlConfig).then(() => {
      const mssqlQuery = 'SELECT * FROM dbo.Student';
      mssql.query(mssqlQuery).then((result) => {
        resolve(result.recordsets[0]);
        mssql.close();
      }).catch((error) => {
        console.log(error);
        reject(error);
        mssql.close();
      });
      //
    }).catch((error) => {
      console.log(error);
      reject(error);
      mssql.close();
    });
  });
}

module.exports = query;