import React from "react";
import { useSelector } from "react-redux";
import NumberFormat from "react-number-format";

export const Browse = () => {
  const products = useSelector((state) => state.products);

  const categories = [...new Set(products.map((product) => product.category))];

  return (
    <div>
      {categories.map((cat) => {
        return (
          <div key={cat}>
            <h3>{cat}</h3>
            {products
              .filter((p) => p.category === cat)
              .map((product) => (
                <div
                  style={{ backgroundColor: product.hexCode }}
                  key={product.id}
                >
                  {product.name}{" "}
                  <NumberFormat
                    value={(product.price)/100}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale	={true}
                  />
                  /gal
                </div>
              ))}
          </div>
        );
      })}
    </div>
  );
};
export default Browse;
