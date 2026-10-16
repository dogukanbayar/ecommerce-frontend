import {
  SET_CATEGORIES,
  SET_PRODUCT_LIST,
  SET_TOTAL,
  SET_FETCH_STATE,
  SET_ACTIVE_PRODUCT,
} from "../actions/productActions";

const initialState = {
  categories: [],
  productList: [],
  total: 0,
  activeProduct: null,
  fetchState: "NOT_FETCHED",
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return { ...state, categories: action.payload };
    case SET_PRODUCT_LIST:
      return { ...state, productList: action.payload };
    case SET_TOTAL:
      return { ...state, total: action.payload };
    case SET_FETCH_STATE:
      return { ...state, fetchState: action.payload };
    case SET_ACTIVE_PRODUCT:
      return { ...state, activeProduct: action.payload };
    default:
      return state;
  }
};

export default productReducer;
