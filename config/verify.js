import jwt from'jsonwebtoken';
import config from 'config';
function verify(req,res,next){
    const token =req.header('x-auth-token');
    if(!token){
        return res.status(401).json('No token, Access denied!');
    }
    try{
        const decoded=jwt.verify(token, config.get('TOKEN'));
        req.user=decoded.user;
        next();
    }catch(err){
        res.status(401).json('Token is not valid');
    }
}
module.exports = verify;