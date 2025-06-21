import express from 'express'
const app = express()

import mongoose from './db.js'
import passport from './auth.js'
import menu from './Models/menu.js'

import menuRouter from './routes/menuRoutes.js'

import personRouter from './routes/personRoutes.js'



import bodyParser from 'body-parser'
app.use(bodyParser.json()) // req.body


import 'dotenv/config';
const PORT = process.env.PORT || 3000

app.use(passport.initialize())
const localAuthMiddleware = passport.authenticate('local',{session:false})
const logRequest = (req,res,next)=>{
  console.log(`[${new Date().toLocaleString()}] Request made to: ${req.originalUrl}`)
  next();
}
app.use(logRequest)

app.get('/',(req, res) => {
  res.send('Hi, welcome to our hotel.')
})

app.use('/person',personRouter);
app.use('/menu',menuRouter)

app.listen(PORT, ()=>{console.log("Listening on port 3000")})