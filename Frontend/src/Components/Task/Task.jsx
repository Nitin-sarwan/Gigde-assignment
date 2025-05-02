import React, { useEffect, useState } from 'react'
import './Task.css'
import Nav from '../Nav/Nav'
import axios from 'axios';
import { useLocation,useNavigate } from 'react-router-dom';

const Task = () => {
  const navigate=useNavigate();
  const {state}=useLocation();
  const [title,setTitle]=useState('');
  const [description,setDescription]=useState('');
  const [tasks,setTasks]=useState([]);
  const {projectId}=state || {};
  const [projectTitle,setProjectTitle]=useState('');
  
  const handleClick=(e,index)=>{
    e.preventDefault();
    e.stopPropagation();
    const taskId=tasks[index]._id;
  navigate('/taskDescription', { state: { taskId} });
  }
  const handleStatus = async (e, index) => {
    e.stopPropagation();
    const newStatus = e.target.checked ? 'completed' : 'pending';
    const taskId = tasks[index]._id;
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/task/updateTaskStatus/${taskId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      // Update the local tasks array if successful
      console.log(response.data);
      setTasks((prevTasks) => {
        const updated = [...prevTasks];
        updated[index] = { ...updated[index], status: newStatus };
        return updated;
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleAddTask=async(e)=>{
    e.preventDefault();
    try{
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/task/create`,{
        title,
        description,
        projectId
      },{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      console.log(response.data);
      setTasks(prevTasks=>[...prevTasks,response.data.task]);
      setTitle('');
      setDescription('');
    }catch(err){
      console.log(err);

    }
  }

  const fetchProject=async()=>{
    try{
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/project/getProject/${projectId}`,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      console.log(response.data.project.title);
      setProjectTitle(response.data.project.title);
    }catch(err){
      console.log(err);
    }
  }

  const deleteTask=async(e,index)=>{
    e.stopPropagation();
    const taskId=tasks[index]._id;
    try{
      const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/task/deleteTask/${taskId}`,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      console.log(response.data);
      setTasks(prevTasks =>{
        const newTasks=[...prevTasks]
        newTasks.splice(index,1);
        return newTasks;
      });
    }
    catch(err){
      console.log(err);
    }
  }
  
  const fetchTasks=async()=>{
      try{
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/task/getAlltaskByProject/${projectId}`,{
          headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
          }
        })
        console.log(response.data.tasks);
        setTasks(response.data.tasks);
      }catch(err){
        console.log(err);
      }

    }
    useEffect(()=>{
      fetchTasks();
      fetchProject();
    },[]);

  return (
    <div className="task">
       <Nav/>
        <button className="back-button" onClick={() => navigate(-1)}>Back</button>
          <div className="task-main">
              <h2 className="task-heading">{projectTitle} tasks</h2>
          </div>
            <form className="task-form" onSubmit={handleAddTask} >
            <input type="text"
             placeholder="Enter new task title " 
             value={title} 
             onChange={(e)=>setTitle(e.target.value)} 
              required
             />
             <input type="text"
              placeholder="write new task description "
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
              required
              />
              <button type="submit">add task</button>
          </form>
          <div className="task-container">
            
            {
              tasks.map((task,index)=>{
                return(
                  <>
                    <div key={index} onClick={(e)=>handleClick(e,index)} className="task-content">
                      <div className='left-task'>
                        <h3 className="task-title">{task.title}</h3>
                        <p>Description.....</p>
                        <p>{`${String(new Date(task.createdAt.split('T')[0]).getDate()).padStart(2, '0')}/${String(new Date(task.createdAt.split('T')[0]).getMonth() + 1).padStart(2, '0')}/${new Date(task.createdAt.split('T')[0]).getFullYear() }`}</p>
                      </div>
                      <div className="right-task">
                          <input type="checkbox"
                          className="checkbox"
                          checked={task.status === 'completed'}
                          onClick={(e)=>handleStatus(e,index)}
                           />
                        <button  onClick={(e)=>deleteTask(e,index)} className="delete-task">
                          <img  src="https://img.freepik.com/premium-vector/red-cross-icon-white-x-symbol-red-circle-error-cancel-sign_797523-4248.jpg" alt="" />
                        </button>
                      </div>
                    </div>
                  </>
                )
              })
            }
          </div>
    </div>
  )
}

export default Task
