import mongoose ,{ Schema } from "mongoose"


const subscriptionSchema=new Schema({
    subscriber:{
        type:Schema.Types.ObjectId, // one Who is subscribing
        ref:"User"
    },
    channel:{
        type:Schema.Types.ObjectId,
        ref:"Channel",
        
    }
})


export const subscriptions =mongoose.model("subscription",subscriptionSchema)
