const mongoose = require('mongoose')
const Schema = mongoose.Schema

const operatorSchema = new Schema({
  account: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, { collection: 'operator' })

module.exports = mongoose.model('operator', operatorSchema)
