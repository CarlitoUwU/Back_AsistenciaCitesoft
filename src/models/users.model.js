const db = require('../config/db')
const User = require('./user')

async function getAllUsers () {
  const result = await db.query('SELECT * FROM users')
  return result.rows.map(row => {
    const user = new User()
    user.id = row.id
    user.firstName = row.first_name
    user.lastName = row.last_name
    user.isActive = row.is_active
    user.email = row.email
    user.role = row.role
    return user
  })
}

async function getUserById (id) {
  const result = await db.query('SELECT * FROM users WHERE id = $1', [id])
  if (result.rows.length === 0) return null
  const row = result.rows[0]
  const user = new User()
  user.id = row.id
  user.firstName = row.first_name
  user.lastName = row.last_name
  user.isActive = row.is_active
  user.email = row.email
  user.role = row.role
  return user
}

async function createUser (data) {
  const { firstName, lastName, email, role, isActive = true } = data
  const result = await db.query(
    'INSERT INTO users (first_name, last_name, email, role, is_active) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [firstName, lastName, email, role, isActive]
  )
  return result.rows[0]
}

async function updateUser (id, data) {
  const { firstName, lastName, email, role, isActive = true } = data
  const result = await db.query(
    'UPDATE users SET first_name=$1, last_name=$2, email=$3, role=$4, is_active=$5 WHERE id=$6 RETURNING *',
    [firstName, lastName, email, role, isActive, id]
  )
  return result.rows[0]
}

async function deleteUser (id) {
  await db.query('DELETE FROM users WHERE id = $1', [id])
}

async function findByEmail (email) {
  const result = await db.query('SELECT * FROM users WHERE email = $1', [email])
  if (result.rows.length === 0) return null
  const row = result.rows[0]
  const user = new User()
  user.id = row.id
  user.firstName = row.first_name
  user.lastName = row.last_name
  user.isActive = row.is_active
  user.email = row.email
  user.role = row.role
  return user
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  findByEmail
}
