const mongoose = require('mongoose')
const Schema = mongoose.Schema

const avatarSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Avatar', avatarSchema)
