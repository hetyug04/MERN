import React from "react";
import { useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom'
import styled from "styled-components";
import { FormRow, Alert } from "../components";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { useAppContext } from "../context/AppContext";
const Wrapper = styled.div`
  .loginWrapper {
    height: 40rem;
    width: 35rem;
    background-color: white;
    margin: 10% auto;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .submitBtn {
    height: 3rem;
    width: 10rem;
    background-color: rgb(0, 0, 68);
    border: none;
    outline: none;
    border-radius: 40px;
    color: white;
    font-size: 1.5rem;
    margin: 0 auto;
    cursor: pointer;
  }
  .name {
    margin: 0 auto 3rem;
    width: 15rem;
  }
  .email {
    margin: 0 auto;
    width: 15rem;
  }
  .password {
    margin: 3rem auto 5rem;
    width: 15rem;
  }
  h1 {
    margin: 5rem auto 6rem;
    font-size: 3rem;
  }
  h4 {
    margin: 2rem auto;
  }
  .blue {
    color: lightblue;
    cursor: pointer;
  }
`;


const LoginPage = (e) => {
  const navigate = useNavigate()
  const initalState = {
    name: "",
    email: "",
    password: "",
    isMember: true,
  };
  const [values, setValues] = useState(initalState);
  const {user, isLoading, showAlert, displayAlert, registerUser, registerAlert, loginUser} = useAppContext()
  let registerCredsConfirmed = false;
  
useEffect(()=>{
  if(user){
      console.log(user._id)
      setTimeout(()=>{
          navigate('/dashboard')
      }, 3000)
  }
},[user, navigate])
  const handleSubmit = (e) => {
    e.preventDefault();
    const {name, email, password, isMember} = values
    if(!email || !password || (!isMember&!name)){
        displayAlert()
    }
    if(!isMember){
      if(name.length>15){
        registerAlert('Name Is Too Long')
      }
      else if(name.length<2){
        registerAlert('Name Is Too Short')
      }
      else if(password.length<6){
        registerAlert('Password Is Too Short')
      }
      else{
        registerCredsConfirmed = true;
      }
    }
    const currUser = {name, email, password}
    if(isMember){
      loginUser(currUser)
    }
    else if(registerCredsConfirmed){

          console.log(registerCredsConfirmed)
          registerUser(currUser)
    }

  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  return (
    <Wrapper>
      <div className="loginWrapper" onSubmit={handleSubmit}>
      {showAlert && <Alert />}
        <h1>Welcome Back</h1>
        <TextField
          placeholder="Email"
          type="email"
          className="email"
          name="email"
          variant="standard"
          size="medium"
          value={values.email}
          onChange={handleChange}
        />
        <TextField
          placeholder="Password"
          type="password"
          className="password"
          name="password"
          variant="standard"
          size="medium"
          value={values.password}
          onChange={handleChange}
        />
        <button type="submit" className="submitBtn" onClick={handleSubmit}>
            Login
        </button>
          <h4>
            Don't Have An Account ?{" "}
            <span className="blue" onClick={toggleMember}>
            <Link to='/register'>Make One</Link>
            </span>
          </h4>
      </div>
    </Wrapper>
  );
};

export default LoginPage;
