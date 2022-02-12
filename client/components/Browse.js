import React from "react";
import { useSelector } from "react-redux";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";

export const Browse = () => {
  const products = useSelector((state) => state.products);

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
                <div
                  style={{ backgroundColor: product.hexCode }}
                  key={product.id}
                >
                  {product.name}{" "}
                  <NumberFormat
                    value={product.price}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
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
