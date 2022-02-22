import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useSelector, useDispatch } from "react-redux";
import { fetchLatestOrder, fetchSuccess, deleteCartAndItems } from "../store";
const moment = require("moment");

import Home from "./HomePage/Home";

const theme = createTheme({
  palette: {
    primary: {
      light: "#FFFFFF",
      main: "#EDF2FB",
    },
  },
});

const TAX_RATE = 0.08;

function ccyFormat(num) {
  return `${num.toFixed(2)/100}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

// const rows = [
//   createRow("Paperclips (Box)", 100, 1.15),
//   createRow("Paper (Case)", 10, 45.99),
//   createRow("Waste Basket", 2, 17.99),
// ];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

function SpanningTable(props) {
    const {rows} = props
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Details
            </TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Expected Delivery</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Price / Gallon</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.product}</TableCell>
              <TableCell align="right">{row.expected}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">{ccyFormat(row.price)}</TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
              0
            )} %`}</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export const Success = () => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.auth?.id);
  const cartId = useSelector((state) => state.cart?.id);
  const allProducts = useSelector((state) => state.products);
  const order = useSelector((state) => state.order?.current);
  const orderItems = useSelector((state) => state.order?.current.orderItems);

  useEffect(() => {
    if (id) dispatch(fetchLatestOrder(id));
  }, [id]);

  useEffect(() => {
    if (cartId && cartId !== -1) dispatch(deleteCartAndItems(cartId));
  }, [cartId]);

  let filteredOrderItems;
  orderItems
    ? (filteredOrderItems = orderItems.filter(
        (v, i, a) => a.findIndex((t) => t.productId === v.productId) === i
      ))
    : null;

  let rows;
  filteredOrderItems
    ? (rows = filteredOrderItems.map((prod) => {
        return {
            id: prod.id,
          expected: moment(order.createdAt).add(3, "days").format("L"),
          product: allProducts.filter((paint) => {
            if (paint.id === prod.productId) {
              return paint;
            }
          })[0].name,
          quantity: orderItems.reduce((accum, elem) => {
            if (elem.productId === prod.productId) {
              accum++;
              return accum;
            } else {
              return accum;
            }
          }, 0),
          price: allProducts.filter((paint) => {
            if (paint.id === prod.productId) {
              return paint;
            }
          })[0].price,
        };
      }))
    : null;

    console.log("THIS IS ROWS", rows)

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "75vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 2,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                alignContent: "center",
              }}
              component="div"
            >
              <h2>Order Successful!</h2>
              <SpanningTable />
            </Box>
          </Grid>
        </Grid>
        <Box></Box>
      </ThemeProvider>
      <Home />
    </div>
  );
};
