const loginRoute = require('./login')
const operatorRoute = require('./operator')
const logoutRoute = require('./logout')

module.exports = [
  loginRoute,
  operatorRoute,
  logoutRoute
]
