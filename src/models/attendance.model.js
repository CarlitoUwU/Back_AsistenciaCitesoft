const db = require('../config/db')
const Attendance = require('./attendance')

async function getAllAttendances () {
  const result = await db.query('SELECT * FROM attendance')
  return result.rows.map(row => {
    const attendance = new Attendance()
    attendance.id = row.id
    attendance.user_id = row.user_id
    attendance.weekday = row.weekday
    attendance.hora_init = row.hora_init
    attendance.hora_fin = row.hora_fin
    return attendance
  })
}

async function getAttendanceById (id) {
  const result = await db.query('SELECT * FROM attendance WHERE id = $1', [id])
  if (result.rows.length === 0) return null
  const row = result.rows[0]
  const attendance = new Attendance()
  attendance.id = row.id
  attendance.user_id = row.user_id
  attendance.weekday = row.weekday
  attendance.hora_init = row.hora_init
  attendance.hora_fin = row.hora_fin
  return attendance
}

async function createAttendance (usuarioId) {
  const today = new Date()
  const weekday = today.toLocaleString('en-US', { weekday: 'long' }).toUpperCase()
  const horaInit = today.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
  const attendance = new Attendance()
  attendance.user_id = usuarioId
  attendance.setWeekday(weekday)
  attendance.setHoraInit(horaInit)

  console.log(weekday, horaInit)

  const result = await db.query(
    'INSERT INTO attendance (user_id, weekday, hora_init) VALUES ($1, $2, $3) RETURNING *',
    [attendance.user_id, attendance.weekday, attendance.hora_init]
  )
  return result.rows[0]
}

async function getAttendancesByUserIdHoy (userId) {
  const today = new Date()
  const weekday = today.toLocaleString('en-US', { weekday: 'long' }).toUpperCase()

  const result = await db.query(
    'SELECT * FROM attendance WHERE user_id = $1 AND weekday = $2',
    [userId, weekday]
  )

  return result.rows.map(row => {
    const attendance = new Attendance()
    attendance.id = row.id
    attendance.user_id = row.user_id
    attendance.weekday = row.weekday
    attendance.hora_init = row.hora_init
    attendance.hora_fin = row.hora_fin
    return attendance
  })
}

async function markAttendance (userId) {
  const attendances = await getAttendancesByUserIdHoy(userId)
  if (attendances.length === 0) throw new Error('No hay asistencia registrada para hoy')
  if (attendances.length > 1) throw new Error('Hay múltiples asistencias registradas para hoy')
  if (!attendances) throw new Error('Asistencia no encontrada')

  const attendance = attendances[0]
  const today = new Date()
  const horaFin = today.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
  attendance.setHoraFin(horaFin)

  console.log(attendance)

  const result = await db.query(
    'UPDATE attendance SET hora_fin = $1 WHERE id = $2 RETURNING *',
    [attendance.hora_fin, attendance.id]
  )
  return result.rows[0]
}

async function deleteAttendance (id) {
  await db.query('DELETE FROM attendance WHERE id = $1', [id])
}

async function getAttendancesByUserId (userId) {
  const result = await db.query('SELECT * FROM attendance WHERE user_id = $1', [userId])
  return result.rows.map(row => {
    const attendance = new Attendance()
    attendance.id = row.id
    attendance.user_id = row.user_id
    attendance.weekday = row.weekday
    attendance.hora_init = row.hora_init
    attendance.hora_fin = row.hora_fin
    return attendance
  })
}

async function getUsersPresent () {
  const today = new Date()
  const weekday = today.toLocaleString('en-US', { weekday: 'long' }).toUpperCase()

  const query = `
  SELECT *
  FROM public.users u
  INNER JOIN public.attendance a ON u.id = a.user_id
  WHERE a.weekday = $1 AND a.hora_fin IS NULL`

  const result = await db.query(query, [weekday])

  return result.rows
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
