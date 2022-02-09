import React, { useState, useEffect, useCallback } from "react";
import {useSpring, animated} from 'react-spring'
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { useForm } from "react-hook-form";

export const LoginModal = ({ showModal, setShowModal }) => {
  const [alignment, setAlignment] = useState("left");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const animation = useSpring({
      config:{
          duration: 600
      },
      opacity: showModal ? 1: 0,
      transform: showModal ? `translateY(0%)` : `translateY(-100%)`
  })


  const { register, handleSubmit } = useForm();

//i think because local state is being held on this form, it doesn't work
//need to move (which will make it look nicer anyway), the login and the register to seperate componenents and import them here.
//shouldn't be too hard but i want to get the exit functionality working.

  return (
    <>
      {showModal ? (
        <Container>
          <Background>
              <animated.div style={animation}>
            <ModalWrapper>
            <Grid container>
                <Grid item xs={10.5}>
              <p>
                {alignment === "left" ? "Welcome Back!" : "Nice to Meet You!"}
              </p>
              </Grid>
              <Grid item xs={1.5}>
              <IconButton onClick={()=>setShowModal(prev=>!prev)}>
                  <CloseIcon/>
              </IconButton>
              </Grid>
              </Grid>
              <ToggleButtonGroup
                value={alignment}
                exclusive
                color="primary"
                onChange={handleAlignment}
              >
                <ToggleButton
                value="left">SIGN IN</ToggleButton>
                <ToggleButton value="right">I'M NEW HERE</ToggleButton>
              </ToggleButtonGroup>
              
                 {
                     alignment === "left" ? 
                     <Box component='form' onSubmit={handleSubmit((data) => alert(JSON.stringify(data)))} sx={{marginTop: 5}}>
                     <Grid container spacing={3}>
                     <Grid item xs={12} sm={12}>
                         <TextField
                         id="outlined-basic"
                         label="Email"
                         variant="outlined"
                         autoFocus
                         {...register('email',{required:true})}
                         fullWidth
                         />
                     </Grid>
                     <Grid item xs={12} sm={12}>
                         <TextField
                         id="password"
                         label="Password"
                         type="password"
                         variant="outlined"
                         {...register('password',{required:true})}
                         fullWidth
                         />
                     </Grid>
                     <Grid item xs={12} sm={12}>
                         <Button
                         type="submit"
                         fullWidth
                         variant="contained"
                         color="primary"
                         >
                         Submit
                         </Button>
                     </Grid>
                     </Grid> 
                     </Box>
                     : 
             <Box component='form' onSubmit={handleSubmit((data) => alert(JSON.stringify(data)))} sx={{marginTop: 5}}>        
            <Grid container spacing={3}>
                <Grid item xs={6} sm={6}>
                    <TextField
                    id="outlined-basic"
                    label="First Name"
                    variant="outlined"
                    autoFocus
                    {...register('firstName',{required:true})}
                    fullWidth
                    />
                </Grid>
                <Grid item xs={6} sm={6}>
                    <TextField
                    id="outlined-basic"
                    label="Last Name"
                    variant="outlined"
                    {...register('lastName',{required:true})}
                    fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    {...register('email',{required:true})}
                    fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                    id="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    {...register('password',{required:true, minLength:8,})}
                    fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    >
                    Submit
                    </Button>
                </Grid>
                </Grid>
                </Box>
                 }
             
            </ModalWrapper>
            </animated.div>
          </Background>
        </Container>
      ) : null}
    </>
  );
};

// {alignment === 'left' ? }

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
  height: 450px;
  padding: 24px;
  overflow: hidden;
  border-radius: 10px;
`;
// display: grid;
// grid-template-columns: 1fr;
// grid-template-rows: auto 1fr auto;

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
