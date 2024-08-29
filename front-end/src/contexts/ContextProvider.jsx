import { createContext, useContext, useState } from "react";
import { useAuth } from "../hooks/auth";

const StateContext = createContext({
    // user: null,
    // token: null,
    // setUser: () => {},
    // setToken: () => {}
});

export const ContextProvider = ({ children }) => {
    // console.log('context user :',useAuth().user);

    // const [user, _setUser] = useState(useAuth().user);

    // console.log('coucou');

    // const setUser = (user) => {
    //     console.log('setUser user :',user);
    //     _setUser(user);
    // }

    // const [user, setUser] = useState({
    //     name: 'John Doe',
    //     email: 'jahn.doe@gmail.com'
    // });
    // const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

    // const setToken = (token) => {
    //     _setToken(token);
    //     if(token) {
    //         localStorage.setItem('ACCESS_TOKEN', token);
    //     } else {
    //         localStorage.removeItem('ACCESS_TOKEN');
    //     }
    // }


    return (
        <StateContext.Provider value={{
            // user,
            // setUser,
            // token,
            // setToken
        }}>
            {children}
        </StateContext.Provider>
    );
}

export const useStateContext = () => useContext(StateContext);