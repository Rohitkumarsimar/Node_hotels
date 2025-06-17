import mongoose from 'mongoose'

//Creating person schema
const personSchema =new mongoose.Schema({
name:{
    type: String, required: true
},
age:{
    type: Number,required: true
},
work:{
    type: String,
    enum:['Chef','Manager','Waiter','Owner'],required:true
},
mobile:{
    type: String,required:true
},
email:{
    type: String, required: true, unique:true
},
address:{
    type: String
},
salary:{
    type:Number, required:true
}
})

// Creating person model
const Person = mongoose.model('Person',personSchema)
export default Person
