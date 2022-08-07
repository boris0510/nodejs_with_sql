/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
const express = require('express');

const router = express.Router();

// DataBase
const mysql = require('mysql');
const mssql = require('mssql');

// DataBase Config
const mysqlConfig = require('../config/mysqlConfig');
const mssqlConfig = require('../config/mssqlConfig');

// tools
const mysqlQuery = require('../tools/mysqlQuery');
const mssqlQuery = require('../tools/mssqlQuery');

console.log(`================================= Initial Success =================================`);

// GET mysql
router.get('/mysql', (req, res) => {
  const mysqlPool = mysql.createPool(mysqlConfig);
  mysqlPool.getConnection((error, connection) => {
    if (error) {
      console.log(error);
      connection.release();
      return;
    }
    const mysqlQuery = 'SELECT * FROM user';
    connection.query(mysqlQuery, (error, result) => {
      if (error) {
        console.log(error);
        res
          .send({
            success: false,
            error,
          })
          .end();
        connection.release();
        return;
      }
      res
        .send({
          success: true,
          data: result,
        })
        .end();
      connection.release();
    });
  });
});

// GET mysql
router.get('/mysql2', (req, res) => {
  mysql.createPool(mysqlConfig).then(() => {
    const mysqlQuery = 'SELECT * FROM user';
    mysql.query(mysqlQuery).then((result) => {
      res
        .send({
          success: true,
          data: result,
        })
        .end();
      mysql.release();
    }).catch((error) => {
      console.log(error);
      res
        .send({
          success: false,
          error,
        })
        .end();
      mysql.release();
    });
  }).catch((error) => {
    console.log(error);
    res
      .send({
        success: false,
        error,
      })
      .end();
    mysql.release();
  });
});

router.get('/mysql3', async (req, res) => {
  try { // 專注在成功
    const data = await mysqlQuery();
    res
    .send({
      success: true,
      data: data,
    })
    .end();
  }
  catch (error) { // 專注在錯誤
    console.log('error', error)
  }
});

// GET mssql
router.get('/mssql', (req, res) => {
  const mssqlConnection = new mssql.ConnectionPool(mssqlConfig);
  mssqlConnection.connect().then(() => {
    const mssqlQuery = 'SELECT * FROM dbo.Student';
    //
    const mssqlRequest = new mssql.Request(mssqlConnection);
    mssqlRequest.query(mssqlQuery).then((result) => {
      res
        .send({
          success: true,
          data: result.recordsets[0],
        })
        .end();
      mssqlConnection.close();
    }).catch((error) => {
      console.log(error);
      res
        .send({
          success: false,
          error,
        })
        .end();
      mssqlConnection.close();
    });
    //
  }).catch((error) => {
    console.log(error);
    res
        .send({
          success: false,
          error,
        })
        .end();
    mssqlConnection.close();
  });
});

// GET mssql2
router.get('/mssql2', (req, res) => {
  mssql.connect(mssqlConfig).then(() => {
    const mssqlQuery = 'SELECT * FROM dbo.Student';
    //
    mssql.query(mssqlQuery).then((result) => {
      res
        .send({
          success: true,
          data: result.recordsets[0],
        })
        .end();
      mssql.close();
    }).catch((error) => {
      console.log(error);
      res
        .send({
          success: false,
          error,
        })
        .end();
      mssql.close();
    });
    //
  }).catch((error) => {
    console.log(error);
    res
      .send({
        success: false,
        error,
      })
      .end();
    mssql.close();
  });
});

router.get('/mssql3', async (req, res) => {
  try { // 專注在成功
    const data = await mssqlQuery();
    res
    .send({
      success: true,
      data: data,
    })
    .end();
  }
  catch (error) { // 專注在錯誤
    console.log('error', error)
  }
});

module.exports = router;