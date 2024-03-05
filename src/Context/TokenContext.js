import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";



export let TokenContext = createContext();

export default function TokenContextProvider(props){

    const [token,setToken] = useState(null);
    const [userData,setUserData] = useState(null);
    
    function getUserData(){
        const userData = jwtDecode(token)
        console.log(userData)
        setUserData(userData)
    }


    useEffect(()=>{
        const val = localStorage.getItem("userToken")
        if(val !== null){
            setToken(val)
            // getUserData()
            setUserData(jwtDecode(val))
        }
    },[token])

    return <TokenContext.Provider value={{token,setToken , userData , setUserData , getUserData }}>
                {props.children}
            </TokenContext.Provider>
}