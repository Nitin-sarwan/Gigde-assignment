import React,{useContext,useState,useEffect} from 'react'
import { userDataContext } from '../Context/userContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserProjectWrapper = ({children}) => {
    const token=localStorage.getItem('token');
    const {user,setUser}=useContext(userDataContext);
    const [isLoading,setIsLoading]=useState(true);
    const navigate=useNavigate();
    useEffect(()=>{
      if(!token){
        navigate('/login');
        return;
      }
      const fetchUserData=async()=>{
        try{
          const response=await axios.get('http://localhost:4000/api/user/profile',{
            headers:{
              Authorization:`Bearer ${token}`
            }
          })
          if(response.status===201){
            setUser(response.data.newUser);
          }
        }catch(err){
          console.error("Error fetching user data:",err);
          localStorage.removeItem('token');
          navigate('/login');
        }finally{
          setIsLoading(false);
        }
      }
      fetchUserData();
    },[token,navigate,setUser]);

    if(isLoading){
      return <div>Loading...</div>
    }
  return (
    <>{children}</>
  )
}

export default UserProjectWrapper
