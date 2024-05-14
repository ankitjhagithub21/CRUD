require('dotenv').config()
const express = require('express')
const connectDb = require('./db')
const router = require('./routes/routes')
const app = express()
const port = 3000

connectDb()

app.set('view engine','ejs')



app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/",router)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})