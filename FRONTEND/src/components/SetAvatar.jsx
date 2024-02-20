import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from "styled-components"
import {ToastContainer,toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"
import loader from "../assets/loader.gif"
import { setAvatarRoute } from '../utils/APIRoutes';
import { Buffer } from "buffer";



function SetAvatar() {
    const api = `https://api.multiavatar.com/4645646`;
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const toastOption = {
      position : "bottom-right",
      autoClose: 5000,
      pauseOnHover : true,
      draggable : true,
      theme : "dark"
    }

    useEffect(() => {
      const checkUser = async () => {
        if (!localStorage.getItem(import.meta.env.VITE_APP_LOCALHOST_KEY)) {
          navigate("/login");
        }
      };
      checkUser();
    }, [])

    const setProfilePicture = async () => {
        if(selectedAvatar == undefined) {
          toastOption.error("Please select an avatar!", toastOption)
        }else {
          const user = await JSON.parse(localStorage.getItem("chat-app-user"));

          await axios.post(`${setAvatarRoute}/${user._id}`, {
            image: avatars[selectedAvatar],
          }).then((response) => {
              if(response.data.isSet){
                user.isAvatarImageSet = true;
                user.avatarImage = response.data.image;
                localStorage.setItem(
                  import.meta.env.VITE_APP_LOCALHOST_KEY,
                  JSON.stringify(user)
                );
                navigate("/");
              }
          }).catch((error) => {
              toast.error("Error while setting avatar. Please try again!", toastOption);
              // throw error;
          })

        }
    };


    useEffect(() => {
      const fetchData = async () => {
          try {
              const data = [];
              for (let i = 0; i < 4; i++) {
                  const response = await axios.get(
                      `${api}/${Math.round(Math.random() * 1000)}`,
                      // { responseType: 'arraybuffer' } // Specify responseType as arraybuffer
                  );
                  // console.log("Image : " , response.data);
                  const buffer = Buffer.from(response.data, 'binary'); // Create buffer from arraybuffer
                  data.push(buffer.toString('base64'));
              }
              setAvatars(data);
              setLoading(false);
          } catch (error) {
              console.error('Error fetching avatars:', error);
              // Handle error, show toast, etc.
          }
      };
      fetchData();
    }, []);
  


  return (
    <>
      {
        loading ? <Container>
            <img src={loader} alt="loader" className='loader'/>
        </Container> : (

          <Container>
            <img
              width="80px"
              src={`data:image/svg+xml;base64,${avatars[3]}`}
              alt='avatar'
            />
            <div className='title-container'>
                <h1>Pick an avatar as your profile picture</h1>
            </div>
            <div className='avatars'>
                {avatars.map((avatarImage, index) => {
                  return (
                    <div
                      key={avatarImage}
                      className={`avatar ${selectedAvatar === index ? 'selected' : ''}`}
                    >
                      <img
                        src={`data:image/svg+xml;base64,${avatarImage}`}
                        alt="avatar"
                        onClick={() => setSelectedAvatar(index)}
                      />
                      {/* {avatarImage} */}
                    </div>
                  );
                })}

            </div>
            <button
              onClick={setProfilePicture} className='submit-btn'
            >
              Set as Profile Picture
            </button>
            <ToastContainer />
          </Container>

        )}
    </>
  );
}


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
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
`;

export default SetAvatar
