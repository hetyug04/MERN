import React, { useEffect, useState, useCallBack } from 'react'
import { useAppContext } from '../context/AppContext.js'
import styled, {createGlobalStyle} from 'styled-components'
import TextField from "@mui/material/TextField";
import axios from 'axios';
import { GlobalStyles } from '@mui/styled-engine'
import mongoose from 'mongoose'
import {Feed, SharedLayout} from '../components/index.js';
import { fontFamily } from '@mui/system';
const GlobalStyle = createGlobalStyle`
body{
    background-color: white;
    display: flex;
    justify-content: center;
}
`
const Wrapper = styled.div`
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.feedTitle{
    text-align: center;
    font-size: 3rem;
    margin-top: 2rem;
}
.feedTitle{
    text-align: center;
    font-size: 2rem;
    font-weight: 400;
    margin-bottom: 2rem;
}
.newPostForm{
    max-height: auto;
    width: 40rem;
    box-shadow: 0px 0px 20px 5px rgba(0,0,0,0.1);
    border-radius: 2rem;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
}
.title{
    width: 10rem;
    margin-left: 2rem;
    margin-bottom: 1rem;
    margin-top: 2rem;
}
.body{
    width: 36rem;
    height: auto;
    margin: 1rem 0 2rem 2rem;
}
.submitBtn{
    width: 5rem;
    height: 3rem;
    margin-right: 2rem;
    margin-bottom: 1rem;
    align-self: flex-end;
    background-color: lightblue;
    border-radius: 2rem;
    border: none;
}
.feedMain{
    height: 30rem;
    width: 40rem;
    box-shadow: 0px 0px 20px 5px rgba(0,0,0,0.1);
    border-radius: 2rem;
    margin-top: 4rem;
}
.logOut{
    margin: 3rem auto 0;
    width: 7rem;
    height: 3rem;
    border: none;
    background-color: lightblue;
}
button{
    cursor: pointer;
}
.titleWrapper{
    background-color: purple;
    width: 90vw;
    height: 6rem;
    display: flex;
    justify-content: center;
    align-items: center;
}
.wrapperStyling{

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.pageTitle{
    color: white;
    font-size: 3rem;
}
`

const Dashboard = () => {
    const {user, postNewPost, clearLocalStorage} = useAppContext()
    const [allPosts, setAllPosts] = useState([])
    const getAllPosts = async() =>{
        const allPosts = await axios.get('/api/v1/feed/getAllPosts')
        setAllPosts(allPosts.data.reverse())
    }
    useEffect(()=>{
        getAllPosts()
        console.log(user)
    }, [user])
    const intialPostState = {
        userId: user._id,
        author: user.userName,
        title: '',
        body: '',
    }
    const [post, setPost] = useState(intialPostState)
    const handleSubmit = (e)=>{
        e.preventDefault()
        postNewPost(post)
        getAllPosts()
        setPost(intialPostState)
    }
    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value});
      };
  return (
    <>
    <GlobalStyle/>
    <Wrapper style={{display: "flex", justifyContent: 'center', alignItems: 'center', width: '100%'}}>
        <div className="wrapperStyling">
        <div className="titleWrapper"><h1 className="pageTitle" >Welcome Back, {user.firstName}</h1></div>
        <SharedLayout/>
        <h1 className="feedTitle">Daily Feed</h1>
        <div className="newPostForm" onSubmit={handleSubmit}>
        <TextField
            placeholder="Title"
            type="title"
            className="title"
            name="title"
            variant="standard"
            size="medium"
            value={post.title}
            onChange={handleChange}
          />
          <TextField
            placeholder="Body"
            type="body"
            className="body"
            name="body"
            variant="outlined"
            size="medium"
            multiline
            value={post.body}
            onChange={handleChange}
          />
          <button type="submit" className="submitBtn" onClick={handleSubmit}>Post</button>
          </div>
          <Feed allPosts={allPosts}/>
        </div>       
    </Wrapper>
    </>
  )
}

export default Dashboard

