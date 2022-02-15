import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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

export const LoginModal = ({ showModal }) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [alignment, setAlignment] = useState("login");
  const [path, setPath] = useState("");

  useEffect(() => {
    if (state) setPath(state.path);
  });

  const onClose = () => {
    //TODO: update this to navigate to where they were when the modal opened
    navigate(path || "/home");
  };

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

  const modalRef = useRef();

  //todo:
  //click outside functionality
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      showModal = false;
      onClose();
    }
  };
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
                      {alignment === "login"
                        ? "Welcome Back!"
                        : "Nice to Meet You!"}
                    </p>
                  </Grid>
                  <Grid item xs={1.5}>
                    <IconButton
                      onClick={() => {
                        showModal = false;
                        onClose();
                      }}
                    >
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
                  <ToggleButton value="login">SIGN IN</ToggleButton>
                  <ToggleButton value="signup">I'M NEW HERE</ToggleButton>
                </ToggleButtonGroup>
                {alignment === "login" ? (
                  <LoginForm path={path} />
                ) : (
                  <RegisterForm path={path} />
                )}
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
