const attendanceModel = require('../models/attendance.model')

exports.getAll = async (req, res) => {
  try {
    const attendances = await attendanceModel.getAllAttendances()
    res.json(attendances)
  } catch (error) {
    console.error('Error getting attendances:', error)
    res.status(500).json({ error: 'Error fetching attendances' })
  }
}

exports.getById = async (req, res) => {
  try {
    const id = req.params.id || req.user.id
    const attendance = await attendanceModel.getAttendanceById(id)
    if (!attendance) return res.status(404).json({ error: 'Attendance not found' })
    res.json(attendance)
  } catch (error) {
    console.error('Error getting attendance by ID:', error)
    res.status(500).json({ error: 'Error fetching attendance' })
  }
}

exports.create = async (req, res) => {
  try {
    const userId = req.user.id
    const newAttendance = await attendanceModel.createAttendance(userId)
    res.status(201).json(newAttendance)
  } catch (error) {
    console.error('Error creating attendance:', error)
    res.status(500).json({ error: 'Error creating attendance' })
  }
}

exports.update = async (req, res) => {
  try {
    const userId = req.user.id
    const updatedAttendance = await attendanceModel.markAttendance(userId)
    res.json(updatedAttendance)
  } catch (error) {
    console.error('Error updating attendance:', error)
    res.status(500).json({ error: 'Error updating attendance' })
  }
}

exports.getAttendancesByUserId = async (req, res) => {
  try {
    const attendances = await attendanceModel.getAttendancesByUserId(req.user.id)
    if (!attendances) return res.status(404).json({ error: 'No attendances found for user' })
    res.json(attendances)
  } catch (error) {
    console.error('Error getting attendances by user ID:', error)
    res.status(500).json({ error: 'Error fetching attendances for user' })
  }
}

exports.getAttendancesByUserIdHoy = async (req, res) => {
  try {
    const attendances = await attendanceModel.getAttendancesByUserIdHoy(req.user.id)
    if (!attendances) return res.status(404).json({ error: 'No attendances found for today' })
    res.json(attendances)
  } catch (error) {
    console.error('Error getting today\'s attendances by user ID:', error)
    res.status(500).json({ error: 'Error fetching today\'s attendances for user' })
  }
}

exports.getUsersPresent = async (req, res) => {
  try {
    const usersPresent = await attendanceModel.getUsersPresent()
    res.json(usersPresent)
  } catch (error) {
    console.error('Error getting present users:', error)
    res.status(500).json({ error: 'Error fetching present users' })
  }
}

exports.deleteAttendance = async (req, res) => {
  try {
    await attendanceModel.deleteAttendance(req.params.id)
    res.status(204).send()
  } catch (error) {
    console.error('Error deleting attendance:', error)
    res.status(500).json({ error: 'Error deleting attendance' })
  }
}
