import express from 'express'
import mongoose from './db.js'
import menu from './Models/menu.js'
import menuRouter from './routes/menuRoutes.js'
import personRouter from './routes/personRoutes.js'
import bodyParser from 'body-parser'
const app = express()
app.use(bodyParser.json()) // req.body

app.get('/', (req, res) => {
  res.send('Hi, welcome to our hotel.')
})

app.use('/person',personRouter);
app.use('/menu',menuRouter)
app.listen(3000, ()=>{console.log("Listening on port 3000")})