import { Schema,model  } from "mongoose";

const schema= Schema({
    id : {
        type:Number,
    },
    name : {
        type : String,
        required : true,
        unique : true,
    },
    author : {
        type:String,
        require :true,
    },
    publisher : {
        type : String,
        require : true,
    },
    cover_page : {
        type:String,
        require:true,
    },
    issued_stock : {
        type : Number,
        require : true,
    },
    total_stock : {
        type : Number,
        require : true,
    },
    availabe_stock : {
        type : Number,
        require : true,
    },
},{
    timestamps : true,
});

const Books = model("Books",schema);

export default Books;