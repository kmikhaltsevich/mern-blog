const { Router } = require('express')
const router = Router()
const auth = require('../middleware/auth.middleware')
const LinkController = require('../controllers/link.controller')

router.post('/generate', auth, LinkController.generate)
router.get('/', auth, LinkController.getAll)
router.get('/:id', auth, LinkController.getById)

module.exports = router
