import { useParams, Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled, {createGlobalStyle} from 'styled-components'
import { Feed, SharedLayout } from '../components'
import { faArrowLeft, faGear, faUserPlus, faUserMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppContext } from '../context/AppContext'

const GlobalStyle = createGlobalStyle`
body{
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
`
const Wrapper = styled.div`
.body{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.header{
  width: 100vw;
  height: 6rem;
  background-color: purple;
  display: flex;
  align-items: center;
}
.pfp{
    height: 15rem;
    width: 15rem;
    background-color: grey;
    border-radius: 10rem;
    margin-top: 3rem;
}
.backBtn{
  color: white;
}
.name{
    margin-top: -1rem;
    color: gray;
}
.addFriend:hover{
    cursor: pointer;
}
`
const UserPage = () => {
    const {id} = useParams()
    const {user} = useAppContext()
    const {_id, userName} = user
    const initialUser = {}
    const initialUserPost = []
    const [currUser, setCurrUser] = useState(initialUser)
    const [userPosts, setUserPosts] = useState(initialUserPost)
    const [isFriend, setFriend] = useState({icon: "", function: "", title: "",})
    const getUser= async() =>{
        try {
            const resp = await axios.post('/api/v1/user/getUser',{userName: id})
            setCurrUser(resp.data)
        } catch (error) {
            console.log(error)
        }
    }
    const getUserPosts = async() =>{
        try {
            const resp = await axios.post('/api/v1/user/getUserPosts',{userName: id})
            setUserPosts(resp.data)
        } catch (error) {
            console.log(error)
        }
    }
    const addFriend = async() =>{
        try {
          const adddFriend = await axios.post('/api/v1/user/add', {userName: userName, friendAdd: id})
          console.log(addFriend)
          checkFriend()
        } catch (error) {
          console.log(error)
        }
      }
    const delFriend = async() =>{
        try {
            const delFriend = await axios.post('/api/v1/user/del', {userName: userName, friendRemove: id})
            checkFriend()
        } catch (error) {
            console.log(error)
        }
    }
    const getUserFriends = async() =>{
        try {
            const getFriends = await axios.post('/api/v1/user/getFriends', {userName: userName})
            console.log(getFriends)
        } catch (error) {
            console.log(error)
        }
    }
    const checkFriend = async() =>{
    try {
        const checkFriend = await axios.post('/api/v1/user/checkFriend', {userName: userName, friend: id})
        if(checkFriend.data){
            setFriend({...isFriend, icon: faUserMinus, title: "Remove Friend", function: delFriend})
        }
        else{
            setFriend({...isFriend, icon: faUserPlus, title: "Add Friend", function: addFriend})
        }
        console.log(checkFriend)
    } catch (error) {
        console.log(error)
    }
}
    useEffect(()=>{
        checkFriend()
        getUser()
        getUserPosts()
        getUserFriends()
    }, [])
  return (
    <>
    <GlobalStyle/>
    <Wrapper>    
        <div className="body">
            <div className="header"><Link to="/dashboard"><FontAwesomeIcon className="backBtn" icon={faArrowLeft} style={{fontSize: '2rem', justifySelf: 'left'}}/>  </Link></div>
            <SharedLayout/>
            <div className="pfp"></div>
            <h1 className="author">{currUser.userName} {id===userName ?  <FontAwesomeIcon icon={faGear}/>: <FontAwesomeIcon className="addFriend" icon={isFriend.icon} size='xs' color='#89CFF0' title={isFriend.title} onClick={isFriend.function}/>}
            </h1>
            <h2 className='name'>{currUser.firstName}</h2>
            <h1>{}</h1>
            <Feed allPosts={userPosts}/>
        </div>
    </Wrapper>
    </>
  )
}

export default UserPage