import express from 'express'
import Person from '../Models/person.js'

const personRouter = express.Router();

personRouter.post('/',async (req,res)=>{
  try{
    const data  = req.body 
    const newPerson = Person(data)
    const response = await newPerson.save()
    console.log('Data saved: ', response)
    res.status(200).json(response)
  }catch(err){
    console.log(err);
    res.status(500).json(err)
  }
})

//GET method to retrive info from db
personRouter.get('/',async (req,res)=>{
  try{
    const data = await Person.find()
    console.log('Data found')
    res.status(200).json(data)
  }catch(err){
   console.log('Error getting data: ',err)
   res.status(500).json({err:'Internal server error'})
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