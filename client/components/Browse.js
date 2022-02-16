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
    dots: true,
    infinite: true,
    lazyLoad: true,
    speed: 300,
    slidesToShow: 6,
    centerMode: true,
    centerPadding: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    height: 4
    //beforeChange: (current, next) => setImageIndex(next),
  };

  const theme = createTheme({
    palette: {
        primary: {
          light: '#fafbfe',
          main: '#edf2fb'
        },
        secondary: {
          light: '#ffffff',
          main: '#000000'
          
        },
    }
  })

  return (
    <ThemeProvider theme={theme}>
    <div>
      {categories.map((cat) => {
        return (
          <div key={cat}>
            <h3 >
              <Link to={`/browse/${cat.toLowerCase()}`} className="colortitle">The {cat}s</Link>
            </h3>
            <Slider {...settings}>
              {products.filter((p) => p.category === cat)
                .map((product) => (
                  <Link to={`/product/${product.id}`} key={product.id}>
                    <Box sx={{height: "60vh", backgroundColor: product.hexCode, textAlign: 'left'}}>
                      <p className='paintchipname'>{product.name}{" "}</p>
                    </Box>
                  </Link>
                ))}
            </Slider>
          </div>
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