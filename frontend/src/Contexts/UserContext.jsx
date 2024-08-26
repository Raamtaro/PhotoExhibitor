import React, {createContext, useState, useEffect, useContext} from "react";

//Create Context
const UserContext = createContext(null)

export const useUser = () => useContext(UserContext);

//Provider Component
export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [userLoading, setUserLoading] = useState(true);

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem('user'));
        if (savedUser) {
          setUser(savedUser);
        }
        setUserLoading(false)
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
        <UserContext.Provider value = {{user, login, logout, userLoading}}>
            {children}
        </UserContext.Provider>
    )
}