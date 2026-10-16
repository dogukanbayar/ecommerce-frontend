import { api } from "../../api/api";

export const SET_CATEGORIES = "SET_CATEGORIES";
export const SET_PRODUCT_LIST = "SET_PRODUCT_LIST";
export const SET_TOTAL = "SET_TOTAL";
export const SET_FETCH_STATE = "SET_FETCH_STATE";
export const SET_ACTIVE_PRODUCT = "SET_ACTIVE_PRODUCT";

export const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  payload: categories,
});

export const setProductList = (products) => ({
  type: SET_PRODUCT_LIST,
  payload: products,
});

export const setTotal = (total) => ({
  type: SET_TOTAL,
  payload: total,
});

export const setFetchState = (fetchState) => ({
  type: SET_FETCH_STATE,
  payload: fetchState,
});

export const setActiveProduct = (product) => ({
  type: SET_ACTIVE_PRODUCT,
  payload: product,
});

// Thunk: Kategorileri Çek
export const fetchCategoriesThunk = () => async (dispatch) => {
  try {
    const res = await api.get("/categories");
    dispatch(setCategories(res.data));
  } catch (err) {
    console.error("Categories fetch error:", err);
  }
};

// Thunk: Ürün Listesi Çek
export const fetchProductsThunk = (params = {}) => async (dispatch) => {
  dispatch(setFetchState("FETCHING"));
  try {
    const res = await api.get("/products", { params });
    const products = res.data?.products || (Array.isArray(res.data) ? res.data : []);
    const total = res.data?.total || products.length;

    dispatch(setProductList(products));
    dispatch(setTotal(total));
    dispatch(setFetchState("FETCHED"));
  } catch (err) {
    console.error("Fetch products error:", err);
    dispatch(setFetchState("FAILED"));
  }
};

// Thunk: Tekil Ürün Detayı Çek (/products/:productId)
export const fetchProductDetailThunk = (productId) => async (dispatch) => {
  dispatch(setFetchState("FETCHING"));
  try {
    const res = await api.get(`/products/${productId}`);
    dispatch(setActiveProduct(res.data));
    dispatch(setFetchState("FETCHED"));
  } catch (err) {
    console.error("Fetch product detail error:", err);
    dispatch(setFetchState("FAILED"));
  }
};
