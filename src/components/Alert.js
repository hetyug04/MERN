import React from 'react'
import { useAppContext } from '../context/AppContext.js'
import styled from 'styled-components'

const Wrapper = styled.div`
.danger{
    height: 3rem;
    width: 14rem;
    background-color: rgba(255, 0, 0, 0.37);
    display: flex;
    justify-content: center;
    color: red;
    position: absolute;
    left: 0;
    right: 0;
    margin-left: auto; 
    margin-right: auto; 
    top: 10rem;
}
.success{
    height: 3rem;
    width: 14rem;
    background-color: rgba(0, 255, 0, 0.37);
    display: flex;
    justify-content: center;
    color: green;
    position: absolute;
    left: 0;
    right: 0;
    margin-left: auto; 
    margin-right: auto; 
    top: 10rem;
}
.alertText{
    margin-top: .75rem;
    font-size: 1.25rem;
    font-weight: 500;
}
`

const Alert = () => {
    const {alertText, alertType} = useAppContext()
  return (
    <Wrapper>
        <div className="alertWrapper">
        <div className={`${alertType}`}><h1 className='alertText'>{alertText}</h1></div>
        </div>
    </Wrapper>
  )
}

export default Alert