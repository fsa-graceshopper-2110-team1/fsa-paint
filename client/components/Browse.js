import React from "react";
import { useSelector } from "react-redux";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";


export const Browse = () => {
  const products = useSelector((state) => state.products)
    .filter((p) => p.status === "active")
    .sort(function (a, b) {
      if (a.hexCode > b.hexCode) {
        return -1;
      }
      if (a.hexCode < b.hexCode) {
        return 1;
      }
      return 0;
    });

  const categories = [...new Set(products.map((product) => product.category))];

  return (
    <div>
      {categories.map((cat) => {
        return (
          <div key={cat}>
            <h3>
              <Link to={`/browse/${cat.toLowerCase()}`}>The {cat}s</Link>
            </h3>
            {products
              .filter((p) => p.category === cat)
              .map((product) => (
                <Link to={`/product/${product.id}`} key={product.id}>
                  <div style={{ backgroundColor: product.hexCode }}>
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
                </Link>
              ))}
          </div>
        );
      })}
    </div>
  );
};
export default Browse;
