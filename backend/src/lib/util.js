import jwt from "jsonwebtoken"
export const generateToken= (userId,res) =>{
    // generating a token
    const token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn: "7d"}) // the expire date says that you have to log in again after 7 days


    // this is a secure passward send in the form of cookie
    res.cookie("jwt",token,{
        maxAge : 7*24*60*60*1000, //this is in ms (milli second)
        httpOnly : true,// http only cookie so it is a lot more secure
        sameSite : "strict" ,
        secure: process.env.NODE_ENV !=="development"
    })
    return token;
}
