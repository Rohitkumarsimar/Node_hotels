import express from 'express'
import Person from '../Models/person.js'
import {jwtAuthMiddleware, generateToken} from '../jwt.js'
const personRouter = express.Router();

personRouter.post('/signup',async (req,res)=>{
  try{
    const data  = req.body 
    const newPerson = Person(data)
    const response = await newPerson.save()

    const payload = {
      id: response.id,
      username:response.username
    }
    //tokenization:
    const token = generateToken(payload)
    console.log('Token is: ',token)
    res.status(200).json({response:response, token:token})
  }catch(err){
    console.log(err);
    res.status(500).json(err)
  }
})

// Login route
personRouter.post('/login',async (req,res)=>{
  try{
    // extract username and password from the body
    const {username, password} = req.body
    // find the user in DB
    const user = await Person.findOne({username:username})
    // not user
    if(!user|| !(await user.comparePassword(password))){
      res.status(401).json({error:"Invalid username or password"})
    }
    // generate token
    const payload = {
      id: user.id,
      username: user.username
    }
    const token = generateToken(payload)
    // return token
    res.json(token)
  }catch(err){
    console.log(err);
    res.status(500).json(err)
  }
})

//GET method to retrive info from db
personRouter.get('/',jwtAuthMiddleware,async (req,res)=>{
  try{
    const data = await Person.find()
    console.log('Data found')
    res.status(200).json(data)
  }catch(err){
   console.log('Error getting data: ',err)
   res.status(500).json({err:'Internal server error'})
  }
})

// profile route
personRouter.get('/profile',jwtAuthMiddleware,async(req,res)=>{
  try{
const userData = req.user
    const userId = userData.id
    const user = await Person.findById(userId)
    res.status(200).json(user)
  }catch(err){
    console.log(err);
    res.status(500).json(err)
  }
})

personRouter.get('/:workType',async (req,res)=>{
  try{
  const workType = req.params.workType
  if(workType == 'Chef'|| workType == 'Waiter' || workType == 'Manager' || workType == 'Owner'){
    const response = await Person.find({work: workType})
    console.log('Response: ',response)
    res.status(200).json(response)
  }else{
    res.status(404).json('Invalid work type!')
  }
  }catch(err){
console.log("Error fetching data!",err)
  res.status(500).json({err:'Internal server error!'})
  }
})



personRouter.put('/:id',async (req,res)=>{
    try{
        const personID = req.params.id;
        const updatedPerson = req.body;
        const response = await Person.findByIdAndUpdate(personID, updatedPerson,{
            new: true,
            runValidators: true,
        })
        if(!response){
            return res.status(404).json({error: 'Person not found!'})
        }
        console.log('Data Updated.')
        res.status(200).json(response)
    }catch(err){
        console.log('Error updating data',err)
        res.status(500).json({error: 'Internal server error'})
    }
})

personRouter.delete('/:id',async(req,res)=>{
    try{
    const personID = req.params.id;
    const response = await Person.findByIdAndDelete(personID);
    if(!response){
        res.status(404).json({error: 'Person not found!'})
    }
    res.status(200).json({Message: 'Person deleted successfully!'})
        }catch(err){
            console.log('Error deleting data',err)
            res.status(500).json({error: 'Internal server error'})
        }
})
export default personRouter