import React, {createContext, useState, useEffect, useContext} from "react";

//Create Context
const UserContext = createContext(null)

export const useUser = () => useContext(UserContext);

//Provider Component
export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem('user'));
        if (savedUser) {
          setUser(savedUser);
        }
      }, []);

    const login = (userData, token) => {
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', token)
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }

    return (
        <UserContext.Provider value = {{user, login, logout}}>
            {children}
        </UserContext.Provider>
    )
}