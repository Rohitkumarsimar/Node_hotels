import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
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
},
username:{
    type: String,
    required: true
},
password:{
    type: String,
    required:true
}
})

personSchema.pre('save', async function(next) {
    const person = this
    if(!person.isModified('password')) return next()
    try{
        // password hashing
        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(person.password, salt)
        person.password = hashedPassword;
        next()
    }catch(err){
        return next(err)
    }
})

personSchema.methods.comparePassword = async function (candidatePassword){
    try{
        const isMatch = await bcrypt.compare(candidatePassword,this.password)
        return isMatch
    }catch(err){
        throw err
    }
}
// Creating person model
const Person = mongoose.model('Person',personSchema)
export default Person
