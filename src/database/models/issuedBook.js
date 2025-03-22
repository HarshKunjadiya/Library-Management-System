import {model, Schema } from "mongoose";

const schema = Schema(
  {
    bookId: {
      type: Schema.Types.ObjectId,
      ref: "Books",
      require : true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      require : true,
    },
    issuseDate: {
      type: Date,
      require: true,
    },
    returnDate: {
      type: Date,
      require: true,
    }, 
    status: {
      type: String,
      enum: ["Issued", "Returned", "overdued"],
      require :true,
    }
  },
  {
    timestamps: true,
  }
);

const IssuedBookDetails = model("issuedBookDetails",schema);

export default IssuedBookDetails;