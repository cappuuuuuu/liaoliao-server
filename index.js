require('module-alias')({ base: process.cwd() })
const cors = require('cors')
const express = require('express')
const path = require('path')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const socketHandler = require('@controllers/socketHandler')
const commonRoutes = require('@routes/common')
const memberRoutes = require('@routes/member')
const adminRoutes = require('@routes/admin')
const port = process.env.PORT || 49936
require('./config/db.js')

// set views
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// CORS
const corsOptions = {
  origin: process.env.CORS_ORIGIN.split(','),
  credentials: true
}
app.use(cors(corsOptions))

// handle infomation format
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// log
app.use(morgan('dev'))

// Route
app.use('/', commonRoutes)
app.use('/member', memberRoutes)
app.use('/admin', adminRoutes)

app.use((_req, res) => {
  res.status('404').render('404', { title: '404 Error Page', message: 'Page is not found!' })
})

io.on('connection', socket => socketHandler(io, socket))

http.listen(port, () => {
  console.log(`listening on *:${port}`)
})
