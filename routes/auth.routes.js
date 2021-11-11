const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')
const AuthController = require('../controllers/auth.controller')

// /api/auth/register
router.post(
  '/register',
  [
    check('email', 'Email is not correct').isEmail(),
    check('password', 'Password is not correct').isLength({ min: 6 })
  ],
  AuthController.registration
)
// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Enter correct email').normalizeEmail().isEmail(),
    check('password', 'Enter correct password').exists()
  ],
  AuthController.login
)

module.exports = router
