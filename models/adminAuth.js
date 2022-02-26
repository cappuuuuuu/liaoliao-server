const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adminAuthSchema = new Schema({
  account: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, { collection: 'admin.auth' })

module.exports = mongoose.model('AdminAuth', adminAuthSchema)
