import jwt from 'jsonwebtoken';
const jwtAuthMiddleware = (req, res, next)=>{
    //first check the header has auth
    const auth = req.headers.authorization
    if(!auth)return res.status(401).json({error: 'Token not found'})
    // extract jwt token from req headers
    const token = req.headers.authorization.split(' ')[1];
    if(!token)res.status(401).json({error:'Unauthorized!'})
        try{
    const decoded = jwt.verify(token,process.env.JWT_SECRET)

       //attach user info with request object
       req.user = decoded
       next()
    }catch(err){
       console.error(err)
       res.status(401).json({error:'Invalid token!'})
    }
}
// function to generate token
const generateToken = (userData)=>{
    return jwt.sign({userData},process.env.JWT_SECRET,{expiresIn:3000})
}
export { jwtAuthMiddleware, generateToken };