import styled from "styled-components"

const Wrapper = styled.div`
.formRow{
    width: 15rem;
    height: 3.5rem;
    background-color: gray;
    display: flex;
}
.formLabel{
    height: 100%;
    width: 100%;
    border: none;
}
.formInput{
    border: none;
    outline:none;
    transition: border_bottom 1s;
}
.formInput:hover{
    border: none;
    outline:none;
    border-bottom: 2px solid black;
}
`

const FormRow = ({ type, name, value, handleChange, labelText }) => {
    return (
        <Wrapper>
         <div className='formRow'>
        <label htmlFor={name} className='formLabel'>
          {labelText || name}
        </label>
        <input
          type={type}
          value={value}
          name={name}
          onChange={handleChange}
          className='formInput'
        />
      </div>
      </Wrapper>

    )
  }
  
  export default FormRow
  