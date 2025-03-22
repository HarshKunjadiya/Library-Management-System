import { Schema, model } from "mongoose";

const schema = Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  otp: {
    type: Number,
    required: true,
  }, 
  time : {
    type : Number,
    required : true
  },
  role : {
    type : String,
    enum: ["Student", "Admin"],
    required : true,
  }
},{
  timestamps: true,
});

const Otps = model("Otp", schema);
export default Otps;
