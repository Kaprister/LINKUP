import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import LOGO from "../assets/linkuplogo.png"
import DropDown from "../assets/icon-hamburger.svg"


function Contacts({contacts, currentUser, changeChat}) {
  const [hamburger, setHamburger] = useState(false);
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

    useEffect(() => {
      const getData = async () => {
        const data = await JSON.parse(
          localStorage.getItem(import.meta.env.VITE_APP_LOCALHOST_KEY)
        );
        setCurrentUserName(data.username);
        setCurrentUserImage(data.avatarImage);
      }
      getData();
    }, []);

    const changeCurrentChat = (index, contact) => {
      setCurrentSelected(index)
      changeChat(contact)
    }

  return (
    <>
      {
        currentUserImage && currentUserName && (
          <Container>
            <div className='drop-down-icon' >
              <img className='ham-icon' src={DropDown} alt='hamburger' onClick={() => setHamburger(!hamburger)}/>
            </div>
            <div className={`main-div ${hamburger ? "main-visible" : ""}`}>
              <div className='brand'>
                <img src={LOGO} alt='logo'/>
                <h3>LinkUp</h3>
              </div>
              <div className='contacts'>
                {
                  contacts.map((contact, index) => (
                    <div
                      key={contact._id}
                      className={`contact ${index === currentSelected ? "selected" : ""}`}
                      onClick={() => changeCurrentChat(index, contact)}
                      >
                      <div className='avatar'>
                        <img
                          src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                          alt=""
                        />
                      </div>
                      <div className={`username `}>
                        <h3 className={`${index === currentSelected ? "userActive" : ""}`}>{contact.username}</h3>
                      </div>
                    </div>
                  ))
                }
              </div>
              <div className='current-user'>
                <div className='avatar'>
                  <img
                    src={`data:image/svg+xml;base64,${currentUserImage}`}
                    alt="avatar"
                  />
                </div>
                <div className='username'>
                  <h2>{currentUserName}</h2>
                </div>
              </div>
          </div>
          </Container>
        )
      }
    </>
  )
}


const Container = styled.div`
  /* width: 100%; */
  display: flex;
  /* flex-direction: column; */
  .drop-down-icon{
    display: none;
    cursor: pointer;
  }

  .main-div{
    display: grid;
    grid-template-rows: 10% 75% 15%;
    overflow: hidden;
    background-color: #080420;
    width: 100%;
    .brand {
      display: flex;
      align-items: center;
      gap: 0.2rem;
      justify-content: center;
      img {
        height: 4.5rem;
        width: 4.5rem;
      }
      h3 {
        color: white;
        text-transform: uppercase;
        text-shadow: 0px 0px 28px  #4e0eff;
      }
    }
    @media screen and (min-width: 250px) and (max-width: 720px){
        .brand {
          img {
            height: 1rem;
            width: 1rem;
          }
          h3 {
            font-size: 0.6rem;
          }
        }
    }
    .contacts {
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: auto;
      gap: 0.8rem;
      &::-webkit-scrollbar {
        width: 0.2rem;
        &-thumb {
          background-color: #ffffff39;
          width: 0.1rem;
          border-radius: 1rem;
        }
      }
      .contact {
        background-color: #ffffff34;
        background-color: #FDF789;
        min-height: 5rem;
        cursor: pointer;
        width: 90%;
        border-radius: 0.2rem;
        padding: 0.4rem;
        display: flex;
        gap: 1rem;
        align-items: center;
        transition: 0.5s ease-in-out;
        .avatar {
          img {
            height: 3rem;
          }
        }
        .username {
          h3 {
            /* color: white; */
            color: #6F6E6D;
          }
          .userActive{
            color: white;
          }
        }
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        gap: 0.5rem;
        .avatar{
          img{
            height: 2.5rem;
          }
        }
        .username {
          h3 {
            font-size: 1.1rem;
          }
        }
      }
      @media screen and (min-width: 250px) and (max-width: 720px) {
        /* display: none; */
        gap: 0.4rem;
        .avatar{
          img{
            height: 2rem;
          }
        }
        .username {
          h3 {
            font-size: 0.6rem;
          }
        }
      }
      }
      .selected {
        background-color: #9a86f3;
      }
   
    }
  
    .current-user {
      background-color: #0d0d30;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1.2rem;
      padding-right: 0.2rem;
      .avatar {
        img {
          height: 3rem;
          max-inline-size: 100%;
        }
      }
      .username {
        h2 {
          color: white;
        }
      }
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        gap: 0.5rem;
        .username {
          h2 {
            font-size: 1rem;
          }
        }
      }
      @media screen and (min-width: 250px) and (max-width: 720px) {
        /* display: none; */
        gap: 0.5rem;
        .username {
          h2 {
            font-size: 0.7rem;
          }
        }
      }
    }
  }

  @media screen and (min-width: 250px) and (max-width: 720px) {
      .drop-down-icon{
        display: block;
        padding: 15px 15px;
        img:last-child{
          width: 2rem;
          height: 2rem;
          cursor: pointer;
        }
      }
      .main-div{
        display: none;
        background-color: #08042071;
        width: 30%;

        .brand{
          gap: 0.1px;
          img{
            height: 3.5rem;
            width: 3.5rem;
          }
        }
        .contacts{
          .contact{
            min-height: 2rem;
            height: 16%;
            padding-right: 20px;
          }
        }
        .current-user{
          padding-right: 5px;
          background-color: #0d0d308e;

          .avatar{
            img{
              height: 2rem;

            }
          }
        }
      }
      .main-visible{
        display: grid;
        position: fixed;
        left: 8%;
        top: 17%;
        height: 70%;
      }
  }
`;





export default Contacts
