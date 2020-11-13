import * as types from "./constants";

const productListReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case types.PRODUCT_LIST_REQUEST:
      return { loading: true };

    case types.PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };

    case types.PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

const productDetailReducer = (
  state = { loading: true, product: {} },
  action
) => {
  switch (action.type) {
    case types.PRODUCT_REQUEST:
      return { loading: true };

    case types.PRODUCT_SUCCESS:
      return { loading: false, product: action.payload };

    case types.PRODUCT_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export { productListReducer, productDetailReducer };
