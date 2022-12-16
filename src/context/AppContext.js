import React from "react";
import { useState, useReducer, useContext } from "react";
import { DISPLAY_ALERT, HIDE_ALERT, REGISTER_ALERT, REGISTER_USER_BEGIN, REGISTER_USER_ERROR, REGISTER_USER_SUCCESS } from "./actions";
import reducer from "./reducer";
import axios from 'axios'

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");

const initalState = {
  isLoading: false,
  showAlert: false,
  alertType: "",
  alertText: "",
  user: user ? JSON.parse(user) : null,
};
const AppContext = React.createContext();
const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initalState)
    const [pId, setPId] = useState({_id:""})
    const displayAlert = () =>{
        dispatch({type:DISPLAY_ALERT})
        hideAlert()
    }
    const registerCredsConfirmed = false;
    const hideAlert = () =>{
        setTimeout(()=>{
            dispatch({type: HIDE_ALERT})
        }, 3000)
    }
    const registerAlert = (msg) =>{
      dispatch({type: REGISTER_ALERT, payload:{msg}})
      hideAlert()
    }
    const setLocalStorage = ({user, token}) =>{
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
    }
    const clearLocalStorage = () => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    };
    const registerUser = async(currUser) =>{
      try {
        const registerReq = await axios.post("/api/v1/auth/register", currUser)
        const {user, token} = registerReq.data
        dispatch({  
          type: REGISTER_USER_SUCCESS,
          payload: {user, token},
        });
        setLocalStorage({user, token})
        hideAlert()
      } catch (error) {
        console.log(error.response)
        dispatch({ type: REGISTER_USER_ERROR, payload: {msg: error.response.data.msg}})
        hideAlert()
      }
    }
    const loginUser = async(currUser) =>{
      try{
        const loginReq = await axios.post('api/v1/auth/login', currUser)
        const {user, token} = loginReq.data;
        dispatch({
          type: REGISTER_USER_SUCCESS,
          payload: {user, token},
        });
        setLocalStorage({user, token})
        hideAlert()
      }catch(error){
        console.log(error.response)
        dispatch({ type: REGISTER_USER_ERROR, payload: {msg: error.response.data.msg}})
        hideAlert()
      }
    }
    const logoutUser = () =>{
      clearLocalStorage()
    }
    const postNewPost = async(currPost) =>{
      try {
        const newPost = await axios.post('api/v1/feed/post', currPost)
        console.log('posted')
      } catch (error) {
        
      }
    }
    const deletePost = async(_id) =>{
      try {
        console.log(_id)
        const deletePost = await axios.delete('/api/v1/feed/deletePost', {data:{_id:_id}})
        console.log('deleted')
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <AppContext.Provider
      value={{
        ...state, displayAlert, registerUser, registerAlert, loginUser, postNewPost, clearLocalStorage, deletePost
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
export {AppProvider}
