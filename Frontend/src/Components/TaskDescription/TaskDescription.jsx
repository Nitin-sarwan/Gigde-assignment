import React, { useEffect, useRef, useState } from 'react'
import Nav from '../Nav/Nav'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './TaskDescription.css'

const TaskDescription = () => {
  const {state}=useLocation();
  const navigate=useNavigate();
  const {taskId}=state || {};
  const [task,setTask]=useState({});
  const formRef = useRef(null); 
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    projectId: '',
    status: '',
  });

  const handleUpdateClick = () => {
    formRef.current.style.display = 'flex'; // Show form
  };

  const handleFormChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSave=async()=>{
    try{
      const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/task/updateTask/${taskId}`,{
        title: formData.title,
        description: formData.description,
        projectId: formData.projectId,
        status: formData.status
      },{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log(response.data);
      setTask((prev) => ({
        ...prev,
        title: formData.title,
        description: formData.description,
        status: formData.status,
      }));
      formRef.current.style.display = 'none'; // Hide form after saving
      

    }catch(err){
      console.log(err);
    }

  }
 


  const fetchTask=async()=>{
    console.log(taskId);  
    try{
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/task/getTask/${taskId}`,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      console.log(response.data.task);
      setTask(response.data.task);
      setFormData({
        title: response.data.task.title,
        description: response.data.task.description,
        projectId: response.data.task.projectId,
        status: response.data.task.status,
      });
    }catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    fetchTask();
  },[])

  return (
    <div>
      <Nav/>
      <div className="description-container">
        <div className="description-header">
          <h1 className="task-title">{task.title}</h1>
          <p>description--</p>
          <p>{task.description}</p>
        </div>
        <div className="description-body">
          <h2>Task Details</h2>
          <p><strong>Status:</strong> {task.status}</p>
          <p>
            <strong>Created At:</strong>{' '}
            {task.createdAt 
              ? `${String(new Date(task.createdAt).getDate()).padStart(2, '0')}/${
                  String(new Date(task.createdAt).getMonth() + 1).padStart(2, '0')
                }/${new Date(task.createdAt).getFullYear()}`
              : 'N/A'}
          </p>
          <p>
            <strong>Completed At:</strong>{' '}
            {task.completedAt 
              ? `${String(new Date(task.completedAt).getDate()).padStart(2, '0')}/${
                String(new Date(task.completedAt).getMonth() + 1).padStart(2, '0')
              }/${new Date(task.completedAt).getFullYear()}`
              : 'N/A'}
          </p>
        </div>
        <div className="description-buttons">
        <button onClick={()=>navigate(-1)}>Back</button>
          <button onClick={handleUpdateClick}>Update</button>
        </div>
      </div>
      <div ref={formRef} className="form-modal">
        <div className="form-box">
          <button className="form-box-delete" onClick={() => (formRef.current.style.display = 'none')}>X</button>
          <h2>Update Task</h2>
          <input name="title" value={formData.title} onChange={handleFormChange} placeholder="Title" />
          <textarea name="description" value={formData.description} onChange={handleFormChange} placeholder="Description" />
          <select name="status" value={formData.status} onChange={handleFormChange}>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
      
       
    </div>
  )
}

export default TaskDescription
