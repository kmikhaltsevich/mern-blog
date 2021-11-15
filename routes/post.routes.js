const { Router } = require('express')
const router = Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const auth = require('../middleware/auth.middleware')

const PostController = require('../controllers/post.controller')

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    if (!fs.existsSync('static')) {
      fs.mkdirSync('static')
    }
    cb(null, 'static/')
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + new Date().toISOString().replace(/:/g, '-') + path.extname(file.originalname))
  }
})

const upload = multer({ storage })

router.get('/', PostController.getAll)
router.get('/current', auth, PostController.getCurrentPosts)
router.get('/:id', auth, PostController.getById)
router.post('/create', upload.single('picture'), auth, PostController.create)
router.post('/update', upload.single('picture'), auth, PostController.update)
router.post('/delete', auth, PostController.delete)

module.exports = router
