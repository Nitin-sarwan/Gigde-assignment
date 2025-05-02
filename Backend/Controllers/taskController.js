const taskModel=require('../model/taskModel');
const { validationResult } = require('express-validator');
const projectModel=require('../model/projectModel');

exports.createTask=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors:errors.array()});
    }
    const {title,description,projectId}=req.body;
    const userId=req.user._id;
    if(!title || !description || !projectId){
        return res.status(422).json({message:"Please fill all the fields!"});
    }
    const existingTask=await taskModel.findOne({title,userId});
    if(existingTask){
        return res.status(422).json({message:"Task with this title already exists!"});
    }   

    try{
        const project=await projectModel.findById({_id:projectId,userId});
        if(!project){
            return res.status(422).json({message:"Project not found!"});
        }
        const newTask=await taskModel.create({
            title,
            description,
            userId,
            projectId,
        });
        project.tasks.push(newTask._id);
        await project.save();
        return res.status(201).json({message:"Task created successfully!",task:newTask});
    }catch(err){
        return res.status(500).json({error:err.message});
    }
};

exports.getAllTask=async(req,res)=>{
    const userId=req.user._id;
    try{
        const tasks=await taskModel.find({userId}).sort({createdAt:-1});
        return res.status(200).json({totalTask:tasks.length,tasks});
    }catch(err){
        return res.status(500).json({error:err.message});
    }
};
exports.getTask=async(req,res)=>{
    try{
        const {taskId}=req.params;
        const userId=req.user._id;
        const task=await taskModel.findOne({_id:taskId,userId});
        if(!task){
            return res.status(404).json({message:"Task not found!"});
        }
        return res.status(200).json({task});
    }
    catch(err){
        return res.status(500).json({error:err.message});
    }
};
exports.getTaskByProject=async(req,res)=>{
    try{
        const {projectId}=req.params;
        const userId=req.user._id;
        const project=await projectModel.findOne({_id:projectId,userId});
        if(!project){
            return res.status(404).json({message:"Project not found!"});
        }
        const tasks=await taskModel.find({_id:{$in:project.tasks}}).sort({createdAt:-1});
        return res.status(200).json({totalTask:tasks.length,tasks});
    }catch(err){
        return res.status(500).json({error:err.message});
    }
};
exports.UpdateTask=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors:errors.array()});
    }
    const {taskId}=req.params;
    const { title,description,projectId,status}=req.body;
    const userId=req.user._id;
    try{
        const task=await taskModel.findOne({_id:taskId,userId});
        if(!task){
            return res.status(404).json({message:"Task not found!"});
        }   
        if(title){
            task.title=title;
        }
        if(description){
            task.description=description;
        }   
        if(status){
            task.status=status;
        }
        if(status==="completed"){
            task.completedAt=new Date();
        }
        if(projectId){
            const project=await projectModel.findById({_id:projectId,userId});
            if(!project){
                return res.status(404).json({message:"Project not found!"});
            }
            const oldProject=await projectModel.findById({_id:task.projectId,userId});
            console.log(oldProject);
            console.log(project)
            if(oldProject){
                oldProject.tasks.pull(task._id);
                await oldProject.save();
            }
            project.tasks.push(task._id);
            await project.save();
        }
        await task.save();
        return res.status(200).json({message:"Task updated successfully!",task});
    }catch(err){
        return res.status(500).json({error:err.message});
    }
}
exports.deleteTask=async(req,res)=>{
    try{
        const {taskId}=req.params;
        const userId=req.user._id;
        const task=await taskModel.findOne({_id:taskId,userId});
        if(!task){
            return res.status(404).json({message:"Task not found!"});
        }
        const project=await projectModel.findById({_id:task.projectId,userId});
        if(!project){
            return res.status(404).json({message:"Project not found!"});
        }
        project.tasks.pull(task._id);
        await project.save();
        await task.deleteOne();
        return res.status(200).json({message:"Task deleted successfully!"});
    }
    catch(err){
        return res.status(500).json({error:err.message});
    }
};
exports.updateTaskStatus=async(req,res)=>{
    try{
        const {taskId}=req.params;
        const {status}=req.body;
        const userId=req.user._id;
        const task=await taskModel.findOne({_id:taskId,userId});
        if(!task){
            return res.status(404).json({message:"Task not found!"});
        }   
        task.status=status;
        if(status==="completed"){
            task.completedAt=new Date();
        }
        await task.save();  
        return res.status(200).json({message:"Task status updated successfully!",task});
    }
    catch(err){
        return res.status(500).json({error:err.message});
    }   
}

