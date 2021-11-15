const Post = require('../models/Post')
const fs = require('fs')

class PostController {
  async create (req, res) {
    try {
      const post = await Post.create({ ...req.body, picture: req.file.filename, owner: req.user.userId })
      res.json(post)
    } catch (e) {
      res.status(500).json({ msg: 'Server error' })
    }
  }

  async getAll (req, res) {
    try {
      const posts = await Post.find()
      res.json(posts)
    } catch (e) {
      res.status(500).json({ msg: 'Server error' })
    }
  }

  async getCurrentPosts (req, res) {
    try {
      const posts = await Post.find({ owner: req.user.userId })
      res.json(posts)
    } catch (e) {
      res.status(500).json({ msg: 'Server error' })
    }
  }

  async getById (req, res) {
    try {
      const id = req.params.id
      const post = await Post.findById(id)
      if (post) {
        res.json(post)
      }
      res.json({msg: 'POST IS NOT FOUND'})
    } catch (e) {
      res.status(500).json({ msg: 'Server error', e })
    }
  }

  async update (req, res) {
    try {
      const id = req.body.id
      if (!id) {
        return res.json({msg: 'POST IS NOT FOUND'})
      }
      const post = await Post.findByIdAndUpdate(id, { ...req.body, picture: req.file.filename })
      fs.unlinkSync(`static/${post.picture}`)
      return res.json({ msg: 'Post updated' })
    } catch (e) {
      res.status(500).json({ msg: 'Server error', e })
    }
  }

  async delete (req, res) {
    try {
      const id = req.body.id
      if (!id) {
        return res.json({msg: 'POST IS NOT FOUND'})
      }
      const post = await Post.findByIdAndDelete(id)
      fs.unlinkSync(`static/${post.picture}`)
      return res.json({msg: 'Post deleted'})
    } catch (e) {
      res.status(500).json({ msg: 'Server error', e })
    }
  }
}

module.exports = new PostController()
