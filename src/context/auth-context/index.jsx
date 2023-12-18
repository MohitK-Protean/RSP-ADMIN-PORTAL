import React, { createContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import URLS from "../../navigation/urls";
import axios from "axios";
import {useCookies} from 'react-cookie'

const initialAuthDetails = {
  userName: "",
  email: "",
  isLoggedIn: false,
  type:'',
  appId:'',
};
const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({ ...initialAuthDetails });
  const [token, setToken]=useState('')
  const [cookie,setCookie,clearCookie]=useCookies(['rspAuthToken'])
//  TODO remove default token after proper understanding.

  const login = async (emailId, password) => {
    var data = JSON.stringify({
      email: emailId,
      password: password,
    });

    var config = {
      method: "post",
      url: "/auth/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response= await axios(config);
    if(response.status===200){
      const {body} =response.data
      switch (body.type) {
        case 'buyerapp':
          navigate(`${URLS.BUYER}${URLS.DASHBOARD}`);   
          break;
        case 'settlementagency':
          navigate(`${URLS.SETTLEMENT}${URLS.DASHBOARD}`);   
        break;
        default:
          break;
      }
        setUserDetails((prevState) => ({ ...prevState, isLoggedIn: true, 
          type: response.data.body.type, 
          appId:response.data.body.rsp_app_id,
          userName:response.data.body.name,
          email:response.data.body.email,
        }));
        setToken(`Bearer ${response.data.body.userToken}`)
        setCookie('rspAuthToken',response?.data?.body?.userToken,{path:'/'})
        return(response.data)
    }else{
        console.log('error',response);
      };
      return(response.data)
  };

  const logout=async()=>{
    setUserDetails(()=>({email:'',isLoggedIn:false,userName:''}))
    clearCookie('rspAuthToken')
  }
  return (
    <AuthContext.Provider value={{ userDetails, login, token,logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
