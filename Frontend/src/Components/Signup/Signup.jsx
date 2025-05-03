import React, { useState,useContext} from 'react'
import './Signup.css'
import {useNavigate } from 'react-router-dom'
import axios from 'axios';
import { userDataContext } from "../../Context/userContext";

const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [country,setCountry ] = useState('');
    const [errors, setError] = useState({});



    const {user,setUser}=useContext(userDataContext);





    const handleSubmit = async(e) => {
        e.preventDefault();
        // Handle form submission logic here
        const newemail = email.trim();
        const newErrors = {};
        if (name.trim().length == 0) { newErrors.name = "Name is required" }
        if (email.trim().length == 0) { newErrors.email = "Emaill is required" }
        if (password.trim().length == 0) { newErrors.password = "Password is required" }
        if (country.trim().length == 0) { newErrors.coountryName = "Country name is required" }
        if (newemail.length == 0) { newErrors.email = "Emaill is required" }
        if (password.length < 4 && password.length > 0) { newErrors.password = "Password should be more than 5 characters" }
        if (password.length > 20) { newErrors.password = "Password should be less than 20 characters" }
        if (country.length < 2 && country.length > 0) { newErrors.country = "Company name should be more than 2 characters" }
        if (country.length > 20) { newErrors.country = "Company name should be less than 20 characters" }
        if (!email.endsWith('@gmail.com') && newemail.length > 0) { newErrors.email = "Invalid format!" }
        if (email.includes(' ')) { newErrors.email = "Invalid format!" }

        setError(newErrors);
        if (Object.keys(newErrors).length > 0) {
            return;
        }
        const newUser={
            name,
            email,
            password,
            country
        }
        try{
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/signup`,newUser);
             console.log(response.data.newUser);
            if(response.data.status === 'success'){
                console.log(response.data.newUser);
                setUser(response.data.newUser);
                localStorage.setItem('token',response.data.token);
                navigate('/home');
            }
        }catch(err){
            console.error('There was an error!', err);
            if (err.response && err.response.status === 422) {
                const errorData = err.response.data.errors;
                const errorObj = {};
                errorData.forEach((error) => {
                    errorObj[error.param] = error.msg;
                })
                setError(errorObj);
                return;
            }
            if (err.response && err.response.status === 400) {
                const errorData = err.response.data.message;
                setError({ country: errorData });
                return;
            }
            if (err.response && err.response.status === 500) {
                const errorData = err.response.data.error;
                setError({ country: errorData });
                return;
            }
            navigate('/signup');
        }
        setName('');
        setEmail('');
        setPassword('');
        setCountry('');

    }
    return (
        <div className="signup-main">
            <div className="signup-container">
                <div className="signup-content">
                    <div className="heading">
                        <h1>Create your Gigde account</h1>
                    </div>
                    <form className="signup-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="full-name-label" htmlFor="full-name">Name <span>*</span></label>
                            <input type="text"
                                id="full-name"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            {errors && errors.name && <p className="error">{errors.name}</p>}
                        </div>
                        <div className="form-group">
                            <label className="emaill-label" htmlFor="">Emaill <span>*</span></label>
                            <input type="text"
                                placeholder="Enter your emaill"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            {errors && errors.email && <p className="error">{errors.email}</p>}
                        </div>
                        <div className="form-group">
                            <label className="signup-password-label" htmlFor="">Password <span>*</span></label>
                            <input type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {errors && errors.password && <p className="error">{errors.password}</p>}
                        </div>
                        <div className="form-group">
                            <label className="company-label" htmlFor="">Country Name <span>*</span></label>
                            <input type="text"
                                placeholder="Enter your country name"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                            />
                            {errors && errors.country && <p className="error">{errors.country}</p>}  
                        </div>
                        <button className="sign-button" type="submit">Create Account</button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Signup
