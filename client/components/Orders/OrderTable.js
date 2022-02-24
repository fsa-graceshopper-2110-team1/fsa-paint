import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { fetchOrders } from "../../store";
const moment = require("moment");



//This is the meat of the table code
function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  // console.log("This is ROW PROPS", row)
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.date}
        </TableCell>
        <TableCell align="center">{row.shipping}</TableCell>
        <TableCell align="right">{((row.total/100) +(row.total/100*0.08875)).toFixed(2)}</TableCell>
        <TableCell align="right">{row.expected}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Price ($)</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.details.map((detailRow) => (
                    <TableRow key={detailRow.product}>
                      <TableCell component="th" scope="row">
                        {detailRow.product}
                      </TableCell>
                      <TableCell>
                      {((detailRow.price/ 100)).toFixed(2)}
                      </TableCell>
                      <TableCell align="right">{detailRow.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
//this seems to be some sort of conditional information for the row props
// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       })
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };
//these are the props being passed into row


export const OrderTable = () => {
  const { id } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    id ? dispatch(fetchOrders(id)) : "";
  }, [id]);
  const orders = useSelector((state) => state.order.all);
  const allProducts = useSelector((state) => state.products);



  //details is an array of objects
  //each object has a product, price and amount
  //need to map over a list of the items to create each product
  //however, the way its set up it sends every product, not in quantity
  //so similar to cart need to make a cartItems array that doesn't have the duplicates
  //then map over that non duplicate array to get each product, each price
  //for quantity, you need to go through the whole orderItems array and reduce to get the quanit

  //here is the array of objects passed to tablebody:
  let rows;
  orders
    ? (rows = orders.map((order) => {
    const shipping = JSON.parse(order.shippingAddress)
    let ship
    shipping ? ship = 
    `${shipping.address1 ? shipping.address1 : ""} ${shipping.address2 ? shipping.address2 : ""}

    ${shipping.zip ? shipping.zip : ""}, ${shipping.city? shipping.city : ""}, ${shipping.state ? shipping.state : ""}` : ship = "";
    console.log(ship)

        return {
            id: order.id,
          date: moment(order.createdAt).format("L"),
          shipping: ship,
          total: order.total,
          expected: moment(order.createdAt).add(3, "days").format("L"),
          details: order.orderItems
            .filter(
              (v, i, a) => a.findIndex((t) => t.productId === v.productId) === i
            )
            .map((item) => {
              return {
                product: allProducts.filter((paint) => {
                  if (paint.id === item.productId) {
                    return paint;
                  }
                })[0].name,
                price: allProducts.filter((paint) => {
                  if (paint.id === item.productId) {
                    return paint;
                  }
                })[0].price,
                quantity: order.orderItems.reduce((accum, elem) => {
                  if (elem.productId === item.productId) {
                    accum++;
                    return accum;
                  } else {
                    return accum;
                  }
                }, 0),
              };
            }),
        };
      }))
    : null;

  // orders ? deets = orders.orderItems.map(()) : null;
  //
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Order Date</TableCell>
            <TableCell align="center">Shipping Information</TableCell>
            <TableCell align="right">Total price ($)</TableCell>
            <TableCell align="right">Expected Delivery</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
