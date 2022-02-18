import React from "react";
import { useSelector } from "react-redux";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import {useState} from "react"
import Slider from "react-slick"
import {createTheme, ThemeProvider } from '@mui/material/styles'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Paper from "@mui/material/Paper";


export const Browse = () => {
  const products = useSelector((state) => state.products)
    .filter((p) => p.status === "active")
    .sort(function (a, b) {
      if (a.hexCode > b.hexCode) {
        return -1;
      }
      if (a.hexCode < b.hexCode) {
        return 1;
      }
      return 0;
    });
  const categories = [...new Set(products.map((product) => product.category))];

  const NextArrow = ({ onClick }) => {
    return (
      <div className="arrow next" onClick={onClick}>
        <ArrowForwardIosIcon />
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div className="arrow prev" onClick={onClick}>
        <ArrowBackIosIcon />
      </div>
    );
  };  
 
  const settings = {
    infinite: false,
    lazyLoad: true,
    speed: 300,
    slidesToShow: 8,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    height: 2,
    responsive: [

      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const theme = createTheme({
    palette: {
        primary: {
          light: '#fafbfe',
          main: '#edf2fb'
        },
        secondary: {
          main: '#000000'
        },
    }
  })
  // component={Paper} elevation={6}
  return (
    <ThemeProvider theme={theme}>
    <div>
      {categories.map((cat) => {
        return (
          <Box  key={cat}>
            <Box component={"div"} sx={{height:1}}/>
            <Box component={"h3"} sx={{display:"flex", alignItems: "flex-end", marginLeft: 10, marginTop: 1, height:40}}>
              <Link to={`/browse/${cat.toLowerCase()}`} className="colortitle">The {cat.toUpperCase()}S</Link>
            </Box>
            
            <Slider {...settings}>
              {products.filter((p) => p.category === cat)
                .map((product) => (
                  <Box sx={{display:"flex", marginLeft:10, marginRight:20}} component={"div"}>
                  <Link to={`/product/${product.id}`} key={product.id}>
                    <Box 
                    component={Paper}
                    elevation={4}
                    square
                    sx={{height: 250, width: 160, backgroundColor: product.hexCode, textAlign: 'left'}}>
                    </Box>
                    <Box component={'h4'} sx={{display: "flex", alignItems: "center"}}>
                      <Typography color="secondary" >
                        <b>
                      {product.name}
                      </b>
                      </Typography>
                      </Box>
                  </Link>
                  </Box>
                ))}
            </Slider>
            
          </Box>
        );
      })}
    </div>
    </ThemeProvider>
  )
}  

export default Browse;

/*
{categories.map((cat) => {
        return (
          <div key={cat}>
            <h3>
              <Link to={`/browse/${cat.toLowerCase()}`}>The {cat}s</Link>
            </h3>
            {products
              .filter((p) => p.category === cat)
              .map((product) => (
                <Link to={`/product/${product.id}`} key={product.id}>
                  <div style={{ backgroundColor: product.hexCode }}>
                    {product.name}{" "}
                  </div>
                </Link>
              ))}
          </div>
        );
      })}
*/