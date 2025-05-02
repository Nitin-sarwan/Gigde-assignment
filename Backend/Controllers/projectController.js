const {validationResult}=require('express-validator');
const Project=require('../model/projectModel');
const taskModel=require('../model/taskModel');


exports.createProject=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors:errors.array()});
    }
    const {title}=req.body;
    const userId=req.user._id;
    try{
        const newProject=await Project.create({
            title,
            userId
        });
        return res.status(201).json({message:"Project created successfully!",project:newProject});
    }catch(err){
        return res.status(500).json({error:err.message});
    }
};
exports.getAllProject=async(req,res)=>{
    const userId=req.user._id;
    try{
        const projects=await Project.find({userId}).populate('tasks').sort({createdAt:-1});
        return res.status(200).json({totalProject:projects.length,projects});
    }catch(err){
        return res.status(500).json({error:err.message});
    }
};
exports.getProject=async(req,res)=>{
    try{
        const {projectId}=req.params;
        const userId=req.user._id;
        const project=await Project.findOne({_id:projectId,userId});
        if(!project){
            return res.status(404).json({message:"Project not found!"});
        }
        return res.status(200).json({project});
    }
    catch(err){
        return res.status(500).json({error:err.message});
    }
};
exports.deleteProject=async(req,res)=>{
    try{
        const {projectId}=req.params;
        const userId=req.user._id;
        const project=await Project.findOne({_id:projectId,userId});
        if(!project){
            return res.status(404).json({message:"Project not found!"});
        }
        await taskModel.deleteMany({ _id: { $in: project.tasks } });
        await project.deleteOne();
        return res.status(200).json({message:"Project deleted successfully!"});
    }catch(err){
        return res.status(500).json({error:err.message});
    }
};  