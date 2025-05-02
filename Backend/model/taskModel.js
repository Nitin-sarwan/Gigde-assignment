const mongoose=require("mongoose");

const taskSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    projectId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Project",
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["pending","on-going","completed"],
        default:"pending"
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    completedAt:{
        type:Date,
        default:null
    }
});

taskSchema.methods.updateStatus=function(status){
    this.status=status;
    if(status==="completed"){
        this.completedAt=Date.now();
    }else{
        this.completedAt=null;
    }
    return this.save();
};

module.exports=mongoose.model("Task",taskSchema);
