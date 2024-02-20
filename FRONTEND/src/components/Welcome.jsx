import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import Robot from "../assets/robot.gif"

function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const getUser = async () => {
      setUserName(
        await JSON.parse(
          localStorage.getItem(import.meta.env.VITE_APP_LOCALHOST_KEY)
        ).username
      )
    }
    getUser()
  },[]);

  return (
    <Container>
      <img src={Robot} alt='robot'/>
      <h1>
        Welcome, <span>{userName} !</span>
      </h1>
      <h3>Please select a chat to start messaging...</h3>
    </Container>
  )
}


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  gap: 0.5em;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
  @media screen and (min-width: 720px) and (max-width: 1000px) {
    font-size: 1rem;
  }
  @media screen and (min-width: 350px) and (max-width: 720px) {
    font-size : 0.8rem;
  }
`;


export default Welcome
