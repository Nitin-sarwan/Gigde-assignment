import React, { useState,useContext } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom';
import { userDataContext } from '../../Context/userContext';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState({});
    const [errors, setError] = useState({});

    const {user,setUser}=useContext(userDataContext);
    const submitHandler = async(e) => {
        e.preventDefault();
        const newErrors = {};
        const newemail = email.trim();
        if (email.trim().length == 0) { newErrors.email = "Email address is required" }
        if (password.trim().length == 0) { newErrors.password = "Password is required" }
        if (password.length < 5 && password.length > 0) { newErrors.password = "Password should be more than 8 characters" }
        if (password.length > 20) { newErrors.password = "Password should be less than 20 characters" }
        if (!email.endsWith('@gmail.com') && email.trim().length > 0) { newErrors.email = "Invalid format!" }
        if (email.includes(' ')) { newErrors.email = "Invalid format!" }
        setError(newErrors);
        if (Object.keys(newErrors).length > 0) {
            return;
        }
        const userData={
            email:newemail,
            password:password
        }
        try{
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/login`,userData);
            // console.log(response.data);
            if(response.status===200){
                const data=response.data;
                setUser(data.user);
                localStorage.setItem('token',data.token);
                navigate('/home');
            }
        }catch(err){
            console.log(err);
            if(err.response && err.response.status===422){
                const errorData=err.response.data.errors;
                const errorObj={};
                errorData.forEach((error)=>{
                    errorObj[error.param]=error.msg;
                })
                setError(errorObj);
                return; 
            }
            if(err.response && err.response.status===400){
                const errorData=err.response.data.message;
                setError({password:errorData});
                return; 
            }
            if(err.response && err.response.status===500){
                const errorData=err.response.data.error;
                setError({password:errorData});
                return;
            }
            navigate('/');
        }

        setEmail('');
        setPassword('');
    }
    return (
        <div className="main">
            <div className="container">
                <div className="content">
                    <div className="login-heading">
                        <div className="h1"><h1>Sign in to your Gigde account</h1></div>
                        {/* <div className="p"><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p></div> */}
                    </div>
                    <form className="form-input" onSubmit={submitHandler}>
                        <div className="form-group">
                            <label htmlFor="emailaddress">Email Address</label>
                            <input type="text"
                                id="emailaddress"
                                placeholder="Enter email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                          {errors && errors.email && <p className="error">{errors.email}</p>}
                           
                        </div>
                        <div className="form-group">
                            <label htmlFor="passwordd">Password</label>
                            <input type="password"
                                id="passwordd"
                                placeholder="Enter current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {errors && errors.password && <p className="error">{errors.password}</p>}
                           
                        </div>
                        <button className="loging-button" type="submit">Login</button>
                    </form>
                    <div className="last-div">
                     <p>Create an account</p>
                     <Link className="signup-link" to="/signup">Sign up</Link>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Login
