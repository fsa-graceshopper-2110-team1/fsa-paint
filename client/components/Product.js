import React from "react";
import { useSelector, useDispatch } from "react-redux";
import NumberFormat from "react-number-format";
import { useParams } from "react-router-dom";
import { addToCart } from "../store";

export const Product = () => {
  const { productId } = useParams();
  let product =
    useSelector((state) => state.products).filter(
      (p) => p.id === productId * 1
    )[0] || [];

  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  return (
    <div>
      <h3>{product.name}</h3>
      <NumberFormat
        value={product.price / 100}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
        decimalScale={2}
        fixedDecimalScale={true}
      />{" "}
      <div
        style={{ backgroundColor: product.hexCode, height: 200, width: 100 }}
      ></div>
      <button onClick={() => dispatch(addToCart(cart.id, product.id))}>
        Add To Cart
      </button>
    </div>
  );
};
export default Product;
