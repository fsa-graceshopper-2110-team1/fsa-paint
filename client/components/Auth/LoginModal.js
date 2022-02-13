import React, { useState, useRef } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

export const LoginModal = ({ showModal, setShowModal }) => {
  const [alignment, setAlignment] = useState("left");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const animation = useSpring({
    config: {
      duration: 600,
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`,
  });

  const modalRef = useRef()

  //todo:
  //click outside functionality
  const closeModal = e =>{
      if(modalRef.current === e.target){
          setShowModal(false)
      }
  }

  return (
    <>
      {showModal ? (
        <Container>
          <Background ref={modalRef} onClick={closeModal}>
            <animated.div style={animation}>
              <ModalWrapper>
                <Grid container>
                  <Grid item xs={10.5}>
                    <p>
                      {alignment === "left"
                        ? "Welcome Back!"
                        : "Nice to Meet You!"}
                    </p>
                  </Grid>
                  <Grid item xs={1.5}>
                    <IconButton onClick={() => setShowModal((prev) => !prev)}>
                      <CloseIcon />
                    </IconButton>
                  </Grid>
                </Grid>
                <ToggleButtonGroup
                  value={alignment}
                  exclusive
                  color="primary"
                  onChange={handleAlignment}
                >
                  <ToggleButton value="left">SIGN IN</ToggleButton>
                  <ToggleButton value="right">I'M NEW HERE</ToggleButton>
                </ToggleButtonGroup>
                {alignment === "left" ? <LoginForm /> : <RegisterForm />}
              </ModalWrapper>
            </animated.div>
          </Background>
        </Container>
      ) : null}
    </>
  );
};



const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  flex-direction: column;
  background-color: #fff;
  color: #000;
  position: relative;
  width: 300px;
  height: 480px;
  padding: 24px;
  overflow: hidden;
  border-radius: 10px;
`;


const Container = styled.div`
  position: fixed;
  inset: 0px;
  z-index: 500;
  overflow: hidden;
  padding: var(--spacers-l48);
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
`;
