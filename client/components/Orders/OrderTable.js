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

//this is the function to create the prop that gets passed into row
function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  };
}
// Row is the component that is being rendered

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
          {row.name}
        </TableCell>
        <TableCell align="right">{row.calories}</TableCell>
        <TableCell align="right">{row.fat}</TableCell>
        <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">{row.protein}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
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
Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};
//these are the props being passed into row
const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 3.99),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 4.99),
  createData("Eclair", 262, 16.0, 24, 6.0, 3.79),
  createData("Cupcake", 305, 3.7, 67, 4.3, 2.5),
  createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
];

// const orders = [
//     createData()
// ]
// //need a specific array of objects

// cart.map((item) => {
//     return {
//       quantity: cartItems.reduce((accum, elem) => {
//         if (elem.productId === item.productId) {
//           accum++;
//           return accum;
//         } else {
//           return accum;
//         }
//       }, 0),
//       price_data: {
//         currency: "usd",
//         unit_amount: allProducts.filter((paint) => {
//           if (paint.id === item.productId) {
//             return paint;
//           }
//         })[0].price,
//         product_data: {
//           name: allProducts.filter((paint) => {
//             if (paint.id === item.productId) {
//               return paint;
//             }
//           })[0].name,
//         },
//       },
//     };
//   }))

const object = {
  date: "",
  shipping: "",
  total: "",
  expected: "",
  details: [{ product: "", price: "", amount: "" }],
};

export const OrderTable = () => {
  const { id } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    id ? dispatch(fetchOrders(id)) : "";
  }, [id]);
  const orders = useSelector((state) => state.order.all);
  console.log("THIS IS ORDERS", orders[0]);
  const allProducts = useSelector((state) => state.products);



  //details is an array of objects
  //each object has a product, price and amount
  //need to map over a list of the items to create each product
  //however, the way its set up it sends every product, not in quantity
  //so similar to cart need to make a cartItems array that doesn't have the duplicates
  //then map over that non duplicate array to get each product, each price
  //for quantity, you need to go through the whole orderItems array and reduce to get the quanit

  //here is the array of objects passed to tablebody:
  let roos;
  orders
    ? (roos = orders.map((order) => {
        return {
          date: moment(order.createdAt).format("L"),
          shipping: "",
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
  console.log("THIS IS ROOS", roos);

  // orders ? deets = orders.orderItems.map(()) : null;
  //
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Date</TableCell>
            <TableCell align="right">Shipping Information</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">Expected Delivery</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
