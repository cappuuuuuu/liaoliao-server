const cors = require('cors')
const express = require('express')
const path = require('path')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const morgan = require('morgan')
const socketHandler = require('./controllers/socketHandler')
const avatarsRoutes = require('./routes/avatars')
const stickersRoutes = require('./routes/stickers')
const adminRoutes = require('./routes/admin')
const testRoutes = require('./routes/test')
const dataRoutes = require('./routes/data')
require('./config/db.js')

const port = process.env.PORT || 5000
const corsOptions = {
  origin: process.env.CORS_ORIGIN
}
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

app.use('/avatars', avatarsRoutes)
app.use('/stickers', stickersRoutes)
app.use('/admin', adminRoutes)
app.use('/test', testRoutes)
app.use('/data', dataRoutes)

app.use((_req, res) => {
  res.render('404', { title: '404 Error Page', message: 'Page is not found!' })
})

io.on('connection', socket => socketHandler(io, socket))

http.listen(port, () => {
  console.log(`listening on *:${port}`)
})
