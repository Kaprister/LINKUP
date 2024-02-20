import React from 'react'
import styled from "styled-components";
import axios from "axios";
import {BiPowerOff} from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { logoutRoute } from '../utils/APIRoutes';

function Logout() {
    const navigate = useNavigate();
    // const handleClick = async () =>  {
    //     localStorage.clear();
    //     navigate("/login");
    // }

    const handleClick = () => {
      const doLogout = async () => {
        const id = await JSON.parse(
          localStorage.getItem(import.meta.env.VITE_APP_LOCALHOST_KEY)
        )._id;
        const data = await axios.get(`${logoutRoute}/${id}`);
        if (data.status === 200) {
          localStorage.clear();
          navigate("/login");
        }
      }
      doLogout();
    };

  return (
    <Button onClick={handleClick}>
      <BiPowerOff/>
    </Button>
  )
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;


export default Logout
