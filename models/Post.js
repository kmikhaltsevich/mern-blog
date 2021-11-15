const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  author: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  picture: { type: String },
  date: { type: Date, default: Date.now },
  owner: { type: Types.ObjectId, ref: 'User' },
  clicks: { type: Number, default: 0 }
})

module.exports = model('Post', schema)
