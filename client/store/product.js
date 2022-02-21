import axios from "axios";

/**
 * ACTION TYPES
 */
const GOT_PRODUCTS = "GOT_PRODUCTS";
const UPDATED_PRODUCT = "UPDATED_PRODUCT";
const CREATED_PRODUCT = "CREATED_PRODUCT";

/**
 * ACTION CREATORS
 */
const gotProducts = (products) => ({
  type: GOT_PRODUCTS,
  products,
});

const updatedProduct = (product) => ({
  type: UPDATED_PRODUCT,
  product,
});

const createdProduct = (product) => ({
  type: CREATED_PRODUCT,
  product,
});

/**
 * THUNK CREATORS
 */
export const fetchProducts = () => {
  return async (dispatch) => {
    const { data: products } = await axios.get("/api/products");
    dispatch(gotProducts(products));
  };
};

export const updateProduct = (product) => {
  return async (dispatch) => {
    const { data: updatedProd } = await axios.put(
      `/api/products/${product.id}`,
      product
    );
    dispatch(updatedProduct(updatedProd));
  };
};

export const createProduct = (newProduct) => {
  return async (dispatch) => {
    const { data: product } = await axios.post("/api/products", newProduct);
    dispatch(createdProduct(product));
  };
};

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GOT_PRODUCTS:
      return action.products;
    case UPDATED_PRODUCT:
      return state.map((p) =>
        p.id === action.product.id ? action.product : p
      );
    case CREATED_PRODUCT:
      return [...state, action.product];
    default:
      return state;
  }
}
