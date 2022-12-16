import React, { useEffect } from "react";
import styled from 'styled-components'
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";
const Wrapper =  styled.div`
.post{
    max-height: auto;
    width: 40rem;
    box-shadow: 0px 0px 20px 5px rgba(0,0,0,0.1);
    border-radius: 2rem;
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
}
.title{
    font-size: 1.5rem;
    width: 10rem;
    text-align: left;
    margin: 2rem 3rem 0;
    float: left;
}
.body{
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    font-size: 1.1rem;
    font-weight: 500;
    height: auto;
    margin: 1rem 0 1rem 2rem;
    padding: 1rem;
    text-align: left;
}
.author{
    font-size: 1.25rem;
    text-align: left;
    margin: 0 3rem 1rem;
}
.deleteBtn{
    font-size: 1.5rem;
    transition: color .15s ease-in;
    color: black;
    cursor: pointer;
}
.deleteBtn:hover{
    transition: color .15s ease-in;
    color: red;
}
.editBtn{
    font-size: 1.5rem;
    margin-right: 1rem;
    transition: color .15s ease-in;
    color: black;
    cursor: pointer;
}
.editBtn:hover{
    transition: color .15s ease-in;
    color: green;
}
.postMenu{
    display: flex;
    flex-direction: row;
    width: 4rem;
    align-self: flex-end;
    margin: 1rem 1rem -2rem 0;
}
*:link{
    text-decoration: none;
    color: lightblue;
}
*:visited{
    color: lightblue;
}
Link:hover{
    color: red;
}
`
const Feed = ({ allPosts }) => {
   const {user, deletePost} = useAppContext()
   const inEdit = false;
   const navigate = useNavigate()
   useEffect(()=>{
    
   }, [allPosts])
  return (
    <>
      {allPosts.map((posts) => {
        const { author, title, body, userId, _id, userName } = posts;
        const editMode = false;
        const postLink = `/post/${_id}`
        const userLink = `/user/${author}`
        return (
            <Wrapper>
                <div className="post">
                    {user._id===userId ?
                    <div className="postMenu">
                        <FontAwesomeIcon className="editBtn" onClick={()=>navigate(postLink)} icon={faPencil}/>
                        <FontAwesomeIcon className="deleteBtn" onClick={()=>{deletePost(_id)
                        }}icon={faTrash}/>
                    </div> : <></>}       
                    <h1 className="title">{title}</h1>   
                    {body.length<300 ? 
                    <h1 className="body">{body}</h1> : 
                    <h1 className="body">
                        {body.substring(0, 299)}...<Link to={postLink}>Read More</Link>
                    </h1>} 
                    <h1 className="author"><span style={{ fontWeight: '500' }}>By, </span><Link to={userLink}>{author}</Link></h1>
                    <Link to={postLink}>Link To Post</Link>
                    
                </div>
            </Wrapper>
        );
      })}
    </>
  );
};

export default Feed;
