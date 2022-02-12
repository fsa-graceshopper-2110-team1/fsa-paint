import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CartItem from './CartItem'
import {useSelector} from 'react-redux'

export const CartPage = ()=>{

    //CartItems is set up so it allows for duplicates if you add the same item twice
    //This filter checks if the productId already exists and removes it if it does
    //Result is a pure cart to map over
    const cartItems = useSelector(state => state.cart.cartItems)
    const filteredCartItems = cartItems.reduce((acc, current)=>{
        const x = acc.find(item => item.productId == current.productId);
        if(!x){
            return acc.concat([current]);

        }else{
            return acc;
        }
    })
    console.log(filteredCartItems)
    return(
        <Box>
            <>
            <h1>Shopping Cart</h1>
            {
                cartItems.length === 0 ? <div>Your Cart is Empty</div> :
                <>
                    <Box>
                        <Box>
                            {filteredCartItems.map(item=> <CartItem {...item} key={item.id}/>)}
                        </Box>
                    </Box>
                </>
            }
            </>
        </Box>
    )
}