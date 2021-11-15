const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')

class AuthController {
  async registration (req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), msg: 'Incorrect data' })
      }

      const { email, password } = req.body

      const candidate = await User.findOne({ email })
      if (candidate) {
        return res.status(400).json({ msg: 'User already exist' })
      }

      const hashedPassword = await bcrypt.hash(password, 12)

      const user = new User({ email, password: hashedPassword })
      await user.save()
      res.status(201).json({ msg: 'User created' })
    } catch (e) {
      res.status(500).json({ msg: 'Server error' })
    }
  }

  async login (req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), msg: 'Incorrect data' })
      }

      const { email, password } = req.body

      const user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ msg: 'User is not found' })
      }

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json({ msg: 'Wrong password' })
      }

      const token = jwt.sign(
        { userId: user.id, userEmail: user.email },
        config.get('jwtSecret'),
        { expiresIn: '1h' }
      )

      res.json({ token, userId: user.id, userEmail: user.email })
    } catch (e) {
      res.status(500).json({ msg: 'Server error' })
    }
  }
}

module.exports = new AuthController()
