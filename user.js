const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({
   username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true
  },
  country: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: false
  },
  skills: {
    type: [String],
    default: []
  },
  message: {
    type: String,
    default: ""
  },
  
})
module.exports=mongoose.model("user",userSchema)