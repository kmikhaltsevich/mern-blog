const config = require('config')
const shortid = require('shortid')
const Link = require('../models/Link')

class LinkController {
  async generate (req, res) {
    try {
      const baseUrl = config.get('baseUrl')
      const { to } = req.body

      const code = shortid.generate()

      const existing = await Link.findOne({ to })

      if (existing) {
        return res.json({ link: existing })
      }

      const from = baseUrl + '/t/' + code

      const link = new Link({ code, from, to, owner: req.user.userId })

      await link.save()

      res.status(201).json({ link })
    } catch (e) {
      res.status(500).json({ msg: 'Server error' })
    }
  }

  async getAll (req, res) {
    try {
      const links = await Link.find({ owner: req.user.userId })
      res.json(links)
    } catch (e) {
      res.status(500).json({ msg: 'Server error' })
    }
  }

  async getById (req, res) {
    try {
      const link = await Link.findById(req.params.id)
      res.json(link)
    } catch (e) {
      res.status(500).json({ msg: 'Server error' })
    }
  }
}

module.exports = new LinkController()
