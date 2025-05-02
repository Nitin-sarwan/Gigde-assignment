import React ,{createContext, useState} from 'react'

export const userDataContext= createContext();


const UserContextProvider = ({children}) => {
  const [user,setUser] = useState(null);
  return (
    <div>
        <userDataContext.Provider value={{user,setUser}}>
            {children}
        </userDataContext.Provider>
      
    </div>
  )
}

export default UserContextProvider
