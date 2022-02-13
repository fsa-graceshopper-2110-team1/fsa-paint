import React from 'react'
import {connect, useSelector} from 'react-redux'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import {createTheme, ThemeProvider } from '@mui/material/styles'
import Box from '@mui/material/Box'

export const Home = (props) => {
  const username = useSelector((state) => state.auth.username)
  const theme = createTheme({
    palette: {
        primary: {
            light: '#ffffff',
            main: '#edf2fb'
        },
        secondary: {
          main: '#000000'
        }
    }
  })
  return (
    <ThemeProvider theme={theme}>
      <Card className="main_page_top">
        <CardMedia
          image = {'https://i.postimg.cc/BnpYnnWw/six-n-five-studio-renovation-isern-serra-c-salva-lopez.jpg'}
          className = "living_room_image"
        >
          <CardContent>
           
              <Typography
                component = "p"
              >Paint Your World</Typography> 
              <Box textAlign='center'>               
                <Button variant="outlined" color="primary">Shop</Button>
              </Box>
          </CardContent>
        </CardMedia>
      </Card>
    </ThemeProvider>
  )
}
export default Home

