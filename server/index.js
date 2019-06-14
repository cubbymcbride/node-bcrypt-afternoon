const express = require('express')
const massive = require('massive')
const session = require('express-session')
require('dotenv/config')

const AuthCtrl= require('../controllers/authController')
const treasureCtrl = require('../controllers/treasureController')
const auth = require('./middleware/authMiddleware')


const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('WE LIT')
    app.listen(SERVER_PORT, ()=>console.log(`LISTENING TO ${SERVER_PORT} BOI`))
})

const app = express()

app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}))

app.post('/auth/register', AuthCtrl.register)
app.post('/auth/login', AuthCtrl.login)
app.get('/auth/logout', AuthCtrl.logout)

app.get('/api/treasure/dragon', treasureCtrl.dragonTreasure)
app.get('/api/treasure/user', auth.usersOnly, treasureCtrl.getUserTreasure);
app.post('/api/treasure/user', auth.usersOnly, treasureCtrl.addUserTreasure);
app.get('/api/treasure/all', auth.usersOnly, auth.adminsOnly, treasureCtrl.getAllTreasure);