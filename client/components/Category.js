import React from "react";
import { useSelector } from "react-redux";
import NumberFormat from "react-number-format";
import { useParams } from "react-router-dom";

export const Category = () => {
  const { category } = useParams();
  const products = useSelector((state) => state.products).filter(
    (p) => p.category.toLowerCase() === category && p.status === "active"
  );

  return (
    <div>
      <h3>{category.toUpperCase()}</h3>
      {products.map((product) => (
        <div style={{ backgroundColor: product.hexCode }} key={product.id}>
          {product.name}{" "}
          <NumberFormat
            value={product.price / 100}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
            decimalScale={2}
            fixedDecimalScale={true}
          />
          /gal
        </div>
      ))}
    </div>
  );
};
export default Category;
