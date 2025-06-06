const usersModel = require('../models/users.model')

exports.getAll = async (req, res) => {
  try {
    const users = await usersModel.getAllUsers()
    res.json(users)
  } catch (error) {
    console.error('Error getting users:', error)
    res.status(500).json({ error: 'Error fetching users' })
  }
}

exports.getById = async (req, res) => {
  try {
    const user = await usersModel.getUserById(req.params.id)
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json(user)
  } catch (error) {
    console.error('Error getting user by ID:', error)
    res.status(500).json({ error: 'Error fetching user' })
  }
}

exports.create = async (req, res) => {
  try {
    const newUser = await usersModel.createUser(req.body)
    res.status(201).json(newUser)
  } catch (error) {
    console.error('Error creating user:', error)
    res.status(500).json({ error: 'Error creating user' })
  }
}

exports.update = async (req, res) => {
  try {
    const updatedUser = await usersModel.updateUser(req.params.id, req.body)
    res.json(updatedUser)
  } catch (error) {
    console.error('Error updating user:', error)
    res.status(500).json({ error: 'Error updating user' })
  }
}

exports.remove = async (req, res) => {
  try {
    await usersModel.deleteUser(req.params.id)
    res.json({ message: 'User deleted' })
  } catch (error) {
    console.error('Error deleting user:', error)
    res.status(500).json({ error: 'Error deleting user' })
  }
}
