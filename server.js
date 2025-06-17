import express from 'express'
import mongoose from './db.js'
import menu from './Models/menu.js'
import menuRouter from './routes/menuRoutes.js'
import personRouter from './routes/personRoutes.js'
import bodyParser from 'body-parser'
import 'dotenv/config';
const PORT = process.env.PORT || 3000
const app = express()
app.use(bodyParser.json()) // req.body

app.get('/', (req, res) => {
  res.send('Hi, welcome to our hotel.')
})

app.use('/person',personRouter);
app.use('/menu',menuRouter)

app.listen(PORT, ()=>{console.log("Listening on port 3000")})