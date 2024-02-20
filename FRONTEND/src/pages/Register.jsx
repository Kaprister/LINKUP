import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components"
import {ToastContainer,toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"
import { registerRoute } from '../utils/APIRoutes';
import Logo from "../assets/linkuplogo.png"


function Register() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username : "",
        email : "",
        password : "",
        confirmPassword : "",
    })

    const toastOption = {
        position : "bottom-right",
        autoClose: 5000,
        pauseOnHover : true,
        draggable : true,
        theme : "dark"
    }

    useEffect(() => {
        if(localStorage.getItem(import.meta.env.VITE_APP_LOCALHOST_KEY)){
            navigate("/");
        }
    }, [])


    const handleSubmit = async(e) => {
        e.preventDefault();
        const {password, confirmPassword, username, email} = values;

        await axios.post(registerRoute, {
            username, email, password, confirmPassword
        }).then((response) => {
            if(response.data && response.data.user){
                localStorage.setItem(import.meta.env.VITE_APP_LOCALHOST_KEY, JSON.stringify(response.data.user))
            }
            if(response.data && response.data.msg){
                toast.success(response.data.msg, toastOption)
            }
            navigate("/");
        }).catch((error) => {
            if(error.response && error.response.data && error.response.data.msg){
                toast.error(error.response.data.msg, toastOption)
            }else{
                toast.error("An error occurred while processing your request.", toastOption);
            }
        })
    }

    const handleChange = (e) => {
        setValues({...values, [e.target.name]:e.target.value})
    }

    return (
        <>
            <FormContainer>
               <div>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className='brand'>
                            <img src={Logo} alt=''/>
                            <h1>LinkUp</h1>
                        </div>
                        <input
                            type='text'
                            placeholder='Username'
                            name="username"
                            onChange={(e) => handleChange(e)}
                        />

                        <input
                            type='email'
                            placeholder='Email'
                            name="email"
                            onChange={(e) => handleChange(e)}
                        />

                        <input
                            type='password'
                            placeholder='Password'
                            name="password"
                            onChange={(e) => handleChange(e)}
                        />

                        <input
                            type='password'
                            placeholder='Confirm Password'
                            name="confirmPassword"
                            onChange={(e) => handleChange(e)}
                        />

                        <button type='submit'> Create User</button>
                        <span>already have an account ? <Link to="/login">login</Link> </span>
                    </form>
               </div>
            </FormContainer>
            <ToastContainer/>
        </>
    )
}





const FormContainer = styled.div`
  /* height: 100vh; */
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  padding-top: 5rem;
  padding-bottom: 5rem;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      /* text-transform: uppercase; */
      text-shadow: 0px 0px 28px #4e0eff;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Register
