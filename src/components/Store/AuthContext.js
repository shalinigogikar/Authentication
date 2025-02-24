import React,{ useState,useEffect} from "react";
const AuthContext=React.createContext({
token:'',
isLoggedIn:false,
login:(token)=>{},
logout:()=>{},
});
export const AuthContextProvider=(props)=>{
    const storedToken=localStorage.getItem('token');
    const storedExpiration=localStorage.getItem('expirationTime');
    const [token,setToken]=useState(storedToken);
    const userIsLoggedIn=!!token;
    useEffect(()=>{
        if(storedToken&&storedExpiration)
        {
            const remainingTime=new Date(storedExpiration)-new Date();
            if(remainingTime<=0)
            {
                logoutHandler();
            }else{
                setTimeout(logoutHandler,remainingTime);
            }
        }
    },[storedToken,storedExpiration]);
    const loginHandler=(token)=>{
        const expirationTime=new Date(new Date().getTime()+5*60*1000);
        localStorage.setItem('token',token);  
        localStorage.setItem('expirationTime',expirationTime);   
        setToken(token);
        setTimeout(logoutHandler,5*60*1000);
      };
    const logoutHandler=()=>{
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
    };
    const contextValue={
        token:token,
        isLoggedIn:userIsLoggedIn,
        login:loginHandler,
        logout:logoutHandler
    };
    return(
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};
export default AuthContext;