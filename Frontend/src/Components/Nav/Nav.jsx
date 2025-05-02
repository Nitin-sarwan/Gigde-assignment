import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Nav.css'
import axios from 'axios';

const Nav = () => {
    const navigate = useNavigate();
    const handleLogout = async() => {
        try{
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/user/logout`,
                {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            if(response.status===200){
                localStorage.removeItem('token');
                navigate('/');
            }
        }catch(err){
            console.log(err);

        }
    };
  return (
    <div className="nav" >
       <div className="nav-logo">
           <h1>Gigde</h1>
       </div> 
        <button className="nav-logout" onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Nav
