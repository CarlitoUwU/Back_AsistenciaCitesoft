const db = require('../config/db')
const Attendance = require('./attendance')

async function getAllAttendances () {
  const result = await db.query('SELECT * FROM attendance')
  return result.rows.map(row => {
    const attendance = new Attendance()
    attendance.id = row.id
    attendance.userId = row.userId
    attendance.weekday = row.weekday
    attendance.horaInit = row.horaInit
    attendance.horaFin = row.horaFin
    return attendance
  })
}

async function getAttendanceById (id) {
  const result = await db.query('SELECT * FROM attendance WHERE id = $1', [id])
  if (result.rows.length === 0) return null
  const row = result.rows[0]
  const attendance = new Attendance()
  attendance.id = row.id
  attendance.userId = row.userId
  attendance.weekday = row.weekday
  attendance.horaInit = row.horaInit
  attendance.horaFin = row.horaFin
  return attendance
}

async function createAttendance (data, usuarioId) {
  const { weekday, horaInit } = data
  const attendance = new Attendance()
  attendance.userId = usuarioId
  attendance.setWeekday(weekday)
  attendance.setHoraInit(horaInit)

  const result = await db.query(
    'INSERT INTO attendance (userId, weekday, horaInit) VALUES ($1, $2, $3) RETURNING *',
    [attendance.userId, attendance.weekday, attendance.horaInit]
  )
  return result.rows[0]
}

async function getAttendancesByUserIdHoy (userId) {
  const today = new Date()
  const weekday = today.toLocaleString('es-ES', { weekday: 'long' }).toLowerCase()

  const result = await db.query(
    'SELECT * FROM attendance WHERE userId = $1 AND weekday = $2',
    [userId, weekday]
  )

  return result.rows.map(row => {
    const attendance = new Attendance()
    attendance.id = row.id
    attendance.userId = row.userId
    attendance.weekday = row.weekday
    attendance.horaInit = row.horaInit
    attendance.horaFin = row.horaFin
    return attendance
  })
}

async function markAttendance (userId, horaFin) {
  const attendances = await getAttendancesByUserIdHoy(userId)
  if (attendances.length === 0) throw new Error('No hay asistencia registrada para hoy')
  if (attendances.length > 1) throw new Error('Hay múltiples asistencias registradas para hoy')
  if (!attendances) throw new Error('Asistencia no encontrada')

  const attendance = attendances[0]

  attendance.setHoraFin(horaFin)

  const result = await db.query(
    'UPDATE attendance SET horaFin = $1 WHERE id = $2 RETURNING *',
    [attendance.horaFin, attendance.id]
  )
  return result.rows[0]
}

async function deleteAttendance (id) {
  await db.query('DELETE FROM attendance WHERE id = $1', [id])
}

async function getAttendancesByUserId (userId) {
  const result = await db.query('SELECT * FROM attendance WHERE userId = $1', [userId])
  return result.rows.map(row => {
    const attendance = new Attendance()
    attendance.id = row.id
    attendance.userId = row.userId
    attendance.weekday = row.weekday
    attendance.horaInit = row.horaInit
    attendance.horaFin = row.horaFin
    return attendance
  })
}

async function getUsersPresent () {
  const today = new Date()
  const weekday = today.toLocaleString('es-ES', { weekday: 'long' }).toLowerCase()

  const result = await db.query(
    'SELECT DISTINCT userId FROM attendance WHERE weekday = $1 AND horaFin IS NULL',
    [weekday]
  )

  return result.rows.map(row => row.userId)
}

module.exports = {
  getAllAttendances,
  getAttendanceById,
  createAttendance,
  getAttendancesByUserIdHoy,
  markAttendance,
  deleteAttendance,
  getAttendancesByUserId,
  getUsersPresent
}
