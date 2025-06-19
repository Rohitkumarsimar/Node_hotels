import Person from './Models/person.js'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local';
passport.use(new LocalStrategy(async (username, password, done)=>{
  // Authentication logic here:
  try{
    // console.log('Credential recieved!',username, password)
    const user = await Person.findOne({username})
    if(!user){
      return done(null, false, {message:'Invalid user!'})
    }
    const isPasswordMatch = await user.comparePassword(password) ?true:false;
    if(isPasswordMatch){
      return done(null,user)
    }else{
      return done(null,false,{message:"Incorrect password!"})
    }
    
  }catch(err){
    return done(err)
  }
}))
export default passport