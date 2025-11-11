import jwt from 'jsonwebtoken';
import User from '../models/users.js'

// Verifying JWT

const authentication = (req, res, next)=>{
    try{
        const {token} = req.cookies;
        if(!token)
        {
            throw new Error("Token Missing!")
        }
        const decodedToken = jwt.verify(token, "SecretCode");
        req.userId = decodedToken._id;
        if(!req.userId)
        {
            throw new Error("Invalid User !")
        }
        next();
    }catch(err){
        res.status(404).send(err.message);
    }       
}

export default authentication;