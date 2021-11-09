const { Router } = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')
const router = Router()
const User = require('../models/User')

// /api/auth/register
router.post(
  '/register',
  [
    check('email', 'Email is not correct').isEmail(),
    check('password', 'Password is not correct').isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: 'Incorrect data' })
      }

      const { email, password } = req.body

      const candidate = await User.findOne({ email })
      if (candidate) {
        return res.status(400).json({ message: 'User already exist' })
      }

      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new User({ email, password: hashedPassword })
      await user.save()
      res.status(201).json({ message: 'User created' })
    } catch (e) {
      res.status(500).json({ message: 'Server error' })
    }
  }
)
// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Enter correct email').normalizeEmail().isEmail(),
    check('password', 'Enter correct password').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: 'Incorrect data' })
      }

      const { email, password } = req.body

      const user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ message: 'User is not found' })
      }

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json({ message: 'Wrong password' })
      }

      const token = jwt.sign(
        { userId: user.id, userEmail: user.email },
        config.get('jwtSecret'),
        { expiresIn: '1h' }
      )

      res.json({token, userId: user.id, userEmail: user.email})

    } catch (e) {
      res.status(500).json({ message: 'Server error' })
    }
  }
)

module.exports = router
