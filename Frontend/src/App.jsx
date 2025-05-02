import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './Components/Login/Login'
import Signup from './Components/Signup/Signup'
 import Home from './Components/Home/Home'
import UserProtectWrapper from "./ProjectWrapper/UserProjectWrapper";
import UserContextProvider from './Context/userContext'
import Task from './Components/Task/Task'
import TaskDescription from './Components/TaskDescription/TaskDescription'

const App = () => {
  return (
    <div>
      <UserContextProvider>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/signup" element={
          <Signup/>
          }/>
        <Route path="/home" element={
          <UserProtectWrapper>
          <Home/>
          </UserProtectWrapper>
          }
          />
        <Route path="/task" element={
          <UserProtectWrapper>
          <Task/>
          </UserProtectWrapper>
          }
          />
          <Route path="/taskDescription" element={
            <UserProtectWrapper>
              <TaskDescription/>
            </UserProtectWrapper>
          }
            />
      </Routes>
      </UserContextProvider>

      
    </div>
  )
}

export default App
