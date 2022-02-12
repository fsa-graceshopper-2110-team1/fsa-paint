import React from 'react'

export const CartTotal = ({itemCount, total})=>{
    return(
        <Box>
            <Box>
                <p>{`Subtotal (${itemCount} items): `}</p>
                <p>{`$${total}`}</p>
            </Box>
        </Box>
    )
}