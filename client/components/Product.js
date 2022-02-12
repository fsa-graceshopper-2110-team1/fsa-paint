import React from "react";
import { useSelector } from "react-redux";
import NumberFormat from "react-number-format";
import { useParams } from "react-router-dom";

export const Product = () => {
  const { productId } = useParams();
  let product =
    useSelector((state) => state.products).filter(
      (p) => p.id === productId * 1
    )[0] || [];

  return (
    <div>
      <h3>{product.name}</h3>
      <NumberFormat
        value={product.price}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />{" "}
      <div
        style={{ backgroundColor: product.hexCode, height: 200, width: 100 }}
      ></div>
    </div>
  );
};
export default Product;
