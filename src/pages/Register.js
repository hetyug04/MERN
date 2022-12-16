import React from "react";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
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
  .firstName, .userName {
    margin: 0 auto 3rem;
    width: 15rem;
  }
  .password{
    margin: 0 auto 5rem;
    width: 15rem;
  }
  .lastName{
    margin: 0 auto;
    width: 15rem;
  }
  .email {
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

const Register = (e) => {
  const navigate = useNavigate();
  const initalState = {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    registerPage: false,
  };
  const [values, setValues] = useState(initalState);
  const {
    user,
    isLoading,
    showAlert,
    displayAlert,
    registerUser,
    registerAlert,
    loginUser,
  } = useAppContext();
  let registerCredsConfirmed = false;


  useEffect(() => {
    if (user) {
      console.log(user._id);
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    }
  }, [user, navigate]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, userName, email, password, registerPage } = values;
    if (registerPage === false) {
      if (!email || !firstName || !lastName) {
        displayAlert();
      }
      else{
        setRegisterPage()
      }
      console.log(registerPage)
    }
    if(registerPage===true){
     const currUser = { firstName, lastName, userName, email, password };
      if (userName.length > 15) {
        registerAlert("Name Is Too Long");
      } else if (userName.length < 2) {
        registerAlert("Name Is Too Short");
      } else if (password.length < 6) {
        registerAlert("Password Is Too Short");
      } else {
        if(!userName || !password){
          displayAlert()
        }
        else{
          registerUser(currUser)
        }
      }
    }
  };
  // const currUser = { firstName, lastName, userName, email, password };
  // if (registerCredsConfirmed) {
  //   console.log(registerCredsConfirmed);
  //   registerUser(currUser);
  // }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const setRegisterPage = () =>{
    setValues({...values, registerPage: true})
  }
  return (
    <Wrapper>
      <div className="loginWrapper" onSubmit={handleSubmit}>
        {showAlert && <Alert />}
        {!values.registerPage ? 
        <>
        <h1>Register</h1>
          <TextField
            placeholder="First Name"
            type="firstName"
            className="firstName"
            name="firstName"
            variant="standard"
            size="medium"
            value={values.firstName}
            onChange={handleChange}
          />
        <TextField
          placeholder="Last Name"
          type="lastName"
          className="lastName"
          name="lastName"
          variant="standard"
          size="medium"
          value={values.lastName}
          onChange={handleChange}
        />
        <TextField
          placeholder="Email"
          type="email"
          className="email"
          name="email"
          variant="standard"
          size="medium"
          value={values.email}
          onChange={handleChange}
        /></>:
         <>
         <h1>Register</h1>
          <TextField
          placeholder="User Name"
          type="userName"
          className="userName"
          name="userName"
          variant="standard"
          size="medium"
          value={values.userName}
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
         </>
}
        <button type="submit" className="submitBtn" onClick={handleSubmit}>
         {values.registerPage ? 'Submit' : 'Next'}
        </button>
        <h4>
          Already A Member ?{" "}
          <span className="blue">
            <Link to="/login">Login</Link>
          </span>
        </h4>
      </div>
    </Wrapper>
  );
};

export default Register;
