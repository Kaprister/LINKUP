import React, { useEffect, useRef, useState } from 'react'
import styled from "styled-components";
import {useNavigate} from "react-router-dom"
import axios from "axios"
import {allUsersRoute, host} from "../utils/APIRoutes"
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import {io} from "socket.io-client";


function Chat() {
  const socket = useRef();
  const [contacts, setContacts] = useState([])
  const [currentUser, setCurrentUser] = useState(undefined)
  const [currentChat, setCurrentChat] = useState(undefined)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    const checkUser = async () => {
      if(!localStorage.getItem(import.meta.env.VITE_APP_LOCALHOST_KEY)){
        navigate("/login")
      }else{
        setCurrentUser(await JSON.parse(localStorage.getItem(import.meta.env.VITE_APP_LOCALHOST_KEY)))
        setLoading(true)
      }
    }
    checkUser();
  },[]);

  useEffect(() => {
    if(currentUser){
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser])

  useEffect(() => {
    const fetchData = async () => {
      if(currentUser){
        if(currentUser.isAvatarImageSet){
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data)
        }else{
          navigate("/setAvatar")
        }
      }
    }
    fetchData()
  },[currentUser])

  const handleChatChange = (chat) => {
    setCurrentChat(chat)
  }

  return (
    <>
      <Container>
        <div className='container'>
          <Contacts
            contacts={contacts}
            currentUser={currentUser}
            changeChat={handleChatChange}
          />
          {
            currentChat == undefined ?
            (
              <Welcome />
            ) : (
              <ChatContainer currentChat={currentChat}  socket={socket} />
          )}
        </div>
      </Container>
    </>
  )
}

// currentUser={currentUser}

const Container = styled.div`
  height: 100vh;
  width: 100vw;;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1000px) {
      grid-template-columns: 35% 65%;
    }
    @media screen and (min-width: 250px) and (max-width: 720px) {
      grid-template-columns: 7% 93%;
    }
  }
`;

export default Chat
