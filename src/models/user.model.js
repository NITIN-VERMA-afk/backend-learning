import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const userSchema=new Schema({
     username:{
        type:String,
        required:[true,"plz provide your username"],
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
     email:{
        type:String,
        required:[true,"plz provide your email"],
        unique:true,
        lowercase:true,
        trim:true,
        
    },
     fullName:{
        type:String,
        required:[true,"plz provide your fullname"],
        unique:true,
        lowercase:true,
        trim:true,
        index:true
        
    },
     avatar:{
        type:String,//cloudinary
        required:[true,"plz upload your avatar"],
      },
      coverImage:{
        type:String,//clodinary
      },
      watchHistory:{
        type:Schema.Types.ObjectId,
        ref:"video"
      },
      password:{
        type:String,
        required:[true,"Plz provide your password"] ,
        select:false, 
      },
      refreshToken:{
        type:String,
      }

},{timestamps:true})


userSchema.pre("save", async function (next){
    if(!this.isMoified("password")) return next();
    this.password = await bcrypt.hash(this.password,10)
    next() ;
})


userSchema.methods.isPasswordCorrect=async function (password){
  return await   bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken=function(){
     return jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,
        fullname:this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
       expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
    )
}
userSchema.methods.generateRefreshToken=function(){
    return jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,
        fullname:this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
       expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
    )
}


export  const User=mongoose.model("User",userSchema)