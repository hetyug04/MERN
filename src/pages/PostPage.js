import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled, { createGlobalStyle } from "styled-components";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { SharedLayout } from "../components/index.js";
import { useAppContext } from "../context/AppContext.js";
import TextField from "@mui/material/TextField";
import Switch from '@mui/material/Switch'
const GlobalStyle = createGlobalStyle`
body{
  background-color: white;
}
`;
const Wrapper = styled.div`
  .header {
    width: 100%;
    height: 6rem;
    background-color: purple;
    display: flex;
    align-items: center;
    text-align: center;
  }
  .header h1 {
    color: white;
    font-size: 3rem;
  }
  .bodyWrapper {
    height: auto;
    width: 50%;
    box-shadow: 0px 0px 27px 10px rgba(0, 0, 0, 0.1);
    margin: 2rem auto 0;
    padding: 2.5rem;
    font-size: 1.25rem;
    border-radius: 3rem;
  }
  .backBtn {
    color: white;
  }
  .userWrapper {
    width: 30%;
    box-shadow: 0px 0px 27px 10px rgba(0, 0, 0, 0.1);
    height: 5rem;
    border-radius: 3rem;
    margin: 5rem auto 0;
    font-size: 2rem;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .title{
    margin: 0 auto;
  }
`;
const PostPage = () => {
  const { user } = useAppContext();
  const userName = user.userName;
  const userId = user._id;
  const userLink = `/user/${userName}`;
  const initialPost = {
    title: "",
    body: "",
    author: "",
  };
  const initialPostEdit = {
    title: "",
    body: "",
  };
  const editPost = {
    title: "",
    body: ""
  }
  const [post, setPost] = useState(initialPost);
  const { id } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [postEdit, setPostEdit] = useState(initialPostEdit);
  const handleChange = (e) => {
    setPostEdit({ ...postEdit, [e.target.name]: e.target.value });
  };
  const switchChange = (e) =>{
    setEditMode(!editMode)
  }
  const submitEditPost = async() =>{
    try {
      const resp = await axios.patch(`/api/v1/feed/updatePost`, {title: postEdit.title, body: postEdit.body, _id: id })
      switchChange()
      setPost(postEdit)
      console.log(postEdit)
    } catch (error) {
      console.log(error)
    }
  }
  const getPostData = async () => {
    try {
      const resp = await axios.post(`/api/v1/feed/getPost`, { id: id });
      setPost({
        ...post,
        title: resp.data.title,
        body: resp.data.body,
        author: resp.data.author,
      });
      setPostEdit({ title: resp.data.title, body: resp.data.body });
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPostData();
  }, []);
  return (
    <>
      <GlobalStyle />
      <Wrapper
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          justifySelf: "start",
        }}
      >
        <div className="header">
          <Link to="/dashboard">
            <FontAwesomeIcon
              className="backBtn"
              icon={faArrowLeft}
              style={{ fontSize: "2rem", justifySelf: "left" }}
            />
          </Link>
          {userName===post.author && <Switch checked={editMode} onChange={switchChange}></Switch>}
          {editMode ? (
            <TextField
              placeholder="Title"
              type="title"
              className="title"
              name="title"
              variant="standard"
              size="medium"
              fontSize="16"
              style={{ width: '80%',}}
              InputProps={{style: {margin: "0 10rem",fontSize: 40, color: "white", fontFamily: "inherit", fontSize: '3rem', justifySelf: 'center', fontWeight: 600, textAlign: 'right' } }}
              value={postEdit.title}
              onChange={handleChange}
            />
          ) : (
            <h1 className="title">{post.title}</h1>
          )}
        </div>
        <SharedLayout />
        {editMode ? (
            <TextField
              placeholder="Body"
              type="body"
              className="bodyWrapper"
              name="body"
              variant="standard"
              size="medium"
              value={postEdit.body}
              InputProps ={{style: {fontSize: 'inherit', fontWeight: 'inherit', fontFamily: 'inherit'}}}
              multiline
              onChange={handleChange}
            />
          ) : (
            <div className="bodyWrapper">{post.body}</div>
          )}
        {editMode && <button type="submit" onClick={submitEditPost} className="editPostButton">Done</button>}
        <div className="userWrapper">
          - <Link to={userLink}>{post.author}</Link>
        </div>
      </Wrapper>
    </>
  );
};

export default PostPage;
