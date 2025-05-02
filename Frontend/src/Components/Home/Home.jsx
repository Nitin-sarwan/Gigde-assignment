import React, { useEffect, useState } from 'react'
import Nav from '../Nav/Nav'
import './Home.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [projects,setProjects]=useState([]);
  const [title,setTitle]=useState('');
  const [error,setError]=useState('');
  const [totalTasks,setTotalTasks]=useState(0);
  const [completedTasks,setCompletedTasks]=useState(0);

  const navigate=useNavigate();



  const handleAddProject=async(e)=>{
    e.preventDefault();
    e.stopPropagation();
   
    if(title.length<1){
      setError('Title is required!');
      setTimeout(() => {
        setError('');
      }, 2000);
      return;
    }
    if(projects.length>=4){
      setError('You can only create 5 projects!');
      setTimeout(() => {
        setError('');
      }, 2000);
      return;
    }
    try{
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/project/create`,{
       title}
        ,{
        headers:{
          'Authorization':`Bearer ${localStorage.getItem('token')}`
        }
      });
      setProjects(prevProjects=>[...prevProjects,response.data.project]);
      setTitle('');
    }catch(err){
      console.log(err);
      setTimeout(() => {
        setError('');
      }, 2000);

    }
  }

  const handleTask=(e,index)=>{
    e.preventDefault();
    e.stopPropagation();
    const projectId=projects[index]._id;
    navigate('/task',{state:{projectId}});
  }


  const deleteProject=async(e,index)=>{
    e.preventDefault();
    e.stopPropagation();
    const projectId=projects[index]._id;
    try{
      const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/project/deleteProject/${projectId}`,{
        headers:{
          'Authorization':`Bearer ${localStorage.getItem('token')}`
        }
      });
      setProjects(prevProjects=>{
        const newProjects=[...prevProjects];
        newProjects.splice(index,1);
        return newProjects;
      });
    }
    catch(err){ 
      console.log(err);
    }
  }

  const fetchProjects=async()=>{
    try{
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/project/getAllProject`,{
        headers:{
          'Authorization':`Bearer ${localStorage.getItem('token')}`
        }
      });
      const projects=response.data.projects;
      setProjects(projects);
      let allTasks=0;
      let completed=0;
      projects.forEach(project => {
        allTasks += project.tasks.length;
        // Assuming each task object has a status field (like "completed")
        project.tasks.forEach(task => {
          if (task.status === 'completed') completed++;
        });
      });

      setTotalTasks(allTasks);
      setCompletedTasks(completed);
    }catch(err){
      console.log(err);
    }
  };
  

  useEffect(()=>{
    fetchProjects();
  },[]);
  
  return (
    <div>
     <Nav/>
      <div className="home">
          <h1>You can add your project here</h1>
          <input type="text" placeholder="Enter new project title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <div className="total-status">
            <h3>{completedTasks}/{totalTasks}</h3>
          </div>

        <div className="projects">
          {
            projects.map((project,index)=>{
              return (
                <>  
                    <div key={index} onClick={(e)=>handleTask(e,index)} className="project">
                      <h2 className="project-heading">{project.title}</h2>
                      <div className="project-details">
                        <div>{project.tasks.length}</div>
                        <button onClick={(e)=>deleteProject(e,index)} className="delete-button">
                        <img src="https://img.freepik.com/premium-vector/red-cross-icon-white-x-symbol-red-circle-error-cancel-sign_797523-4248.jpg" alt="" />
                        </button>
                      </div>
                    </div>
           
                </>
              )
             })
          }
        </div>
          <button onClick={handleAddProject}  className="project-button">Add Project</button>
          {error && <div className="error">{error}</div>}
      </div>
    </div>
  )
}

export default Home
