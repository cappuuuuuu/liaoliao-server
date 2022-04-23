const MessageModel = require('@models/message')

const saveMessage = (obj) => {
  const message = new MessageModel(obj)
  message.save()
}

const getMessage = () => {
  return MessageModel.find()
}

module.exports = { saveMessage, getMessage }
