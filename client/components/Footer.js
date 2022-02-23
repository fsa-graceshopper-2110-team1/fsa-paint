import React from 'react'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        light: "#FFFFFF",
        main: "#EDF2FB",
      },
    },
  });
  

function Copyright() {
    return (
      <Typography variant="body2" color="white" align="center" fontFamily="Raleway">
        {'Copyright © '}
        <Link color="inherit" href="https://www.copyright.gov/">
          Grace Paint
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

export const Footer = () =>{

    return(
        <ThemeProvider theme={theme}>
        <Box sx={{ bgcolor: 'gray', p: 3, marginTop:"auto" }} component="footer">
        <Typography
          variant="subtitle1"
          align="center"
          color="white"
          component="p"
          fontFamily="Raleway"
        >
          Marina Chevis + Nicolas Baez + Caitlin Morrison Paulos
        </Typography>
        <Copyright />
      </Box>
      </ThemeProvider>
    )
}