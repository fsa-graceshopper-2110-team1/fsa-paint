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
import {
  fetchLatestOrder,
  deleteCartAndItems,
  updateOrderStatus,
} from "../store";
const moment = require("moment");

import Home from "./HomePage/Home";

const theme = createTheme({
  palette: {
    primary: {
      light: "#FFFFFF",
      main: "#EDF2FB",
    },
  },
  typography: {
    fontFamily: "Raleway",
  },
});

const TAX_RATE = 0.088875;

function ccyFormat(num) {
  return `${num.toFixed(0) / 100}`;
}

function intToFloat(num, decPlaces) {
  return num / 100 + "." + Array(decPlaces + 1).join("0");
}

function SpanningTable(props) {
  const { rows, total } = props;
  const invoiceTaxes = TAX_RATE * total;
  const invoiceTotal = invoiceTaxes + total;

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
            <TableCell align="right">Price ($) / Gallon</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.product}</TableCell>
              <TableCell align="right">{row.expected}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">{intToFloat(row.price, 2)}</TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{intToFloat(total, 2)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
              3
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
  const total = useSelector((state) => state.order?.current.total);
  const shippingInfo = useSelector(
    (state) => state.order?.current.shippingAddress
  );

  useEffect(async () => {
    if (id) {
      const order = await dispatch(fetchLatestOrder(id));
      if (order.id) dispatch(updateOrderStatus(order.id, "confirmed"));
    }
  }, [id]);

  useEffect(() => {
    if (cartId && cartId !== -1) dispatch(deleteCartAndItems(cartId));
  }, [cartId]);

  let shipping;
  shippingInfo ? (shipping = JSON.parse(shippingInfo)) : null;

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

  let firstName, lastName, address1, address2, zip, city, state;
  shipping
    ? ({ firstName, lastName, address1, address2, zip, city, state } = shipping)
    : null;

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
              <h2>Thank You - Order Successful!</h2>
              {rows ? <SpanningTable rows={rows} total={total} /> : null}
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
                marginTop: -2,
              }}
            >
              {shippingInfo && shipping ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    flexDirection: "column",
                  }}
                >
                  <Box component={"h4"} sx={{ marginBottom: 0 }}>
                    Ship To:
                  </Box>
                  <Box>
                    {firstName} {lastName}
                  </Box>
                  <Box>
                    {address1} {address2}
                  </Box>
                  <Box>
                    {zip}
                    {", "}
                    {city}
                    {", "}
                    {state}
                  </Box>
                </Box>
              ) : null}
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
      <Home />
    </div>
  );
};
