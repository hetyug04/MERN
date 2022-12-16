import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const Wrapper = styled.div`
.sideTaskbar{
    width: 30rem;
    height: 6rem;
    display: flex;
    justify-content: center;
    margin: 0 auto;
}
.header{
    width: 100%;
    height: 5rem;
}
ul{
    list-style: none;
    display: flex;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid black;
}
li{
    font-size: 1.5rem;
}
*{
    text-decoration: none;
}
*:link, *:visited{
    color: black
}
h1{
    font-size: 1.5rem;
    font-weight: 500;
}
`
  
const SharedLayout = () => {
    const {user} = useAppContext()
    const {userName} = user
    const userURL = `/user/${userName}`
  return (
    <>
    {user && 
    <Wrapper>
    <div className="sideTaskbar">
        <ul>
            <Link to="/dashboard"><h1>Feed</h1></Link>
            <Link to={userURL}><h1>Account</h1></Link>
            <Link to={userURL}><h1>Settings</h1></Link>
        </ul>
    </div>
    </Wrapper>
    }
    
    </>
  )
}

export default SharedLayout