const mysql = require('mysql')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')

const getAllUsers = (req, res) => {
  // SELECT ALL USERS
  pool.query("SELECT * FROM users", (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const getUserById = (req, res) => {
  // SELECT USERS WHERE ID = <REQ PARAMS ID>
  let id = req.params.id;
  let sql = "SELECT * FROM customers WHERE id = ?"
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [id])

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const createUser = (req, res) => {
  // INSERT INTO USERS FIRST AND LAST NAME
  let firstName = req.body.first_name;
  let lastName = req.body.last_name;
  let email = req.body.e_mail;
  let phone = req.body.phone;

  let sql = "INSERT into customers (first_name, last_name, email_address, phone) VALUES (?, ?, ?, ?)"
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [firstName, lastName, email, phone])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ newId: results.insertId });
  })
}

const updateUserById = (req, res) => {
  // UPDATE USERS AND SET FIRST AND LAST NAME WHERE ID = <REQ PARAMS ID>
  let id = req.params.id;
  let firstName = req.body.first_name;
  let lastName = req.body.last_name;

  let sql = "UPDATE customers SET first_name = ?, last_name = ? WHERE id = ?"
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [firstName, lastName, id])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(204).json();
  })
}

const deleteUserByFirstName = (req, res) => {
  // DELETE FROM USERS WHERE FIRST NAME = <REQ PARAMS FIRST_NAME>
  let firstName = req.body.first_name;
  let sql = "DELETE from customers WHERE first_name = ?"
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [firstName])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ message: `Deleted ${results.affectedRows} user(s)` });
  })
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserByFirstName
}