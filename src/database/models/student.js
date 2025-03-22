import { Schema, model } from "mongoose";

const schema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  div: {
    type: Number,
    required: true,
  },
});

const Student = model("Student", schema);
export default Student;
