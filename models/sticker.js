const mongoose = require('mongoose')
const Schema = mongoose.Schema

const stickerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  data: {
    type: Array,
    required: true
  }
})

module.exports = mongoose.model('Sticker', stickerSchema)
