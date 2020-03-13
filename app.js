const express = require('express')
const app = express()
// Express that it should accept JSON
app.use(express.json())
// require('./routes')(app);
// const subscribersRouter = require('./routes/subscribers')
// app.use('/subscribers', subscribersRouter)
module.exports = app;