import React from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
import calendar from "../assets/images/calendar.svg"
import {Link} from 'react-router-dom'
const Wrapper = styled.div`

.title{
  color: white;
  font-size: 4rem;
  margin: 2rem auto 0;
}
.loginWrapper{
  width: 15rem;
  height: 3rem;
  margin: 0 auto 6rem;
  display: flex;
  justify-content: space-around;
}
.loginWrapper h1{
  color: white;
  font-size: 1.5rem;
  width: 5rem;
  height: 2rem;
  font-weight: 500;
}
.loginWrapper h1:nth-child(1){
  padding-right: 37%;
 border-right: 2px solid white;
}
.imgContainer{
  display: flex;
  justify-content: space-around;
}
.imgContainer h1{
  width: 30rem;
  background-color: red;
}
`
const Landing = () => {
  const fetchData = async() =>{
    const resp = await fetch('/api/v1')
    const data = await resp.json()
    console.log(data)
  }
  useEffect(()=>{
    fetchData()
  },[])
  return (
    <Wrapper>
    <div className="landingBody">
      <h1 className="title">Skedule</h1>
      <div className="loginWrapper">
        <Link to="/login"><h1>Login</h1></Link>
        <Link to ='/register'><h1>Register</h1></Link>
      </div>
      <div className="imgContainer">
    <img className="calendar" src={calendar} alt="" />
    <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis sunt placeat consequatur soluta ut laboriosam? Repudiandae quisquam inventore officia voluptatum molestias magni illum eos ea deserunt sit minima itaque nobis, impedit dicta obcaecati cum fugit recusandae unde, neque quam assumenda!</h1>
      </div>
    </div>
  </Wrapper>
  )
}

export default Landing