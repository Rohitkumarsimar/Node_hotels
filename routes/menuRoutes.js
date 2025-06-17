import express from 'express'
import menu from '../Models/menu.js'

const menuRouter = express.Router();



menuRouter.post('/',async (req,res)=>{
  try{
    const data = req.body
    const newMenu = menu(data)
    const response = await newMenu.save()
    console.log('Data saved: ',response)
    res.status(200).json(response)
  }catch(err){
     console.log(err);
    res.status(500).json(err)
  }
})

menuRouter.get('/',async (req,res)=>{
try{
  const data = await menu.find()
  console.log("successfully fetched data.")
  res.status(200).json(data);
}catch(err){
  console.log("Error fetching data!",err)
  res.status(500).json({err:'Internal server error!'})
}
})

menuRouter.get('/:tasteType',async (req,res)=>{
    try{
        const taste = req.params.tasteType;
        if(taste == 'sweet' || taste == 'spicy' || taste == 'sour'){
            const data = await menu.find({taste: taste});
            console.log("found successfully!")
            res.status(200).json(data)
        }
    }catch(err){
        console.log("Error fetching data!",err)
        res.status(500).json({error:'Invalid taste type!'})
    }
})

menuRouter.put('/:id',async(req,res)=>{
   try{
    const menuID = req.params.id;
    const updatedMenu = req.body;
    const response = await menu.findByIdAndUpdate(menuID,updatedMenu,{
        new:true,
        runValidators:true,
    })
    if(!response){
        console.log('Not found!')
        res.status(404).json({error:"404 not found!"})
    }
    console.log('Menu updated.')
    res.status(200).json(response)
    }catch(err){
        console.log("Error fetching data!",err)
        res.status(500).json({error:'Internal server error!'})
    }
})

menuRouter.delete('/:id',async(req,res)=>{
    try{
        const menuID = req.params.id
        const response = await menu.findByIdAndDelete(menuID)
        if(!response){
            console.log('Not found!')
            res.status(404).json({error: 'Menu not found!'})
        }
        console.log('Menu found')
        res.status(200).json({Message: 'Deleted successfully!'})
    }catch(err){
        console.log("Error fetching data!",err)
        res.status(500).json({error:'Internal server error!'})
    }
})
export default menuRouter