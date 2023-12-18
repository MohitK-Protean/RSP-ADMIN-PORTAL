import React, {useContext} from "react";
import RSPCard from "../../components/card";
import RSPButton from "../../components/button";
import RSPInput from "../../components/input";
import { Form } from "antd";
import logo from "../../assets/logos/protean-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import URLS from "../../navigation/urls";
import AuthContext from "../../context/auth-context";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const authContext=useContext(AuthContext);
  const [error,setErrors]=useState();
  const handleSubmit = ({ emailId, password }) => {
    setErrors('')
    authContext.login(emailId,password).catch((err)=>{
      // show error msg if any
     setErrors(err?.response?.data?.message);
    })
  };
  return (
    <main className="text-center mt-80">
      <img src={logo} alt="protean-logo" />
      <h1 className="heading-extra-bold mb-74">
        RSP <span className="heading-light">Admin Dashboard</span>
      </h1>

      <RSPCard
        cardSize="medium"
        paddingSize="large"
        className="ml-auto mr-auto"
      >
        <h2 className="mb-40 heading-light">
          Admin <span className="heading-extra-bold">Login</span>
        </h2>
        <Form layout="vertical" onFinish={handleSubmit} className="text-left">
          <Form.Item
            label="Email ID"
            name="emailId"
            rules={[
              {
                type: "email",
                message: "Email is not valid!",
              },
            ]}
            validateStatus={error&& 'error'}
            className="mb-40"
          >
            <RSPInput placeholder="Email ID" />
          </Form.Item>
          <Form.Item label="Password" name="password" className="mb-12" validateStatus={error&& 'error'}>
            <RSPInput variant="password" placeholder="Password"
             />
          </Form.Item>
          <div className="text-right mb-64">
            <Link to={URLS.FORGOT_PASSWORD}>Forgot Password?</Link>
          </div>
          {error && <h4 style={{padding:'4px',display:'flex',justifyContent:'center',color:'red' }}>{error}</h4>}
          <RSPButton block htmlType="submit">
            Login
          </RSPButton>
        </Form>
      </RSPCard>
    </main>
  );
};

export default Login;
