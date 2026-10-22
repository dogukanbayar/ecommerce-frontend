import { api } from "../../api/api";

export const SET_CATEGORIES = "SET_CATEGORIES";
export const SET_PRODUCT_LIST = "SET_PRODUCT_LIST";
export const SET_TOTAL = "SET_TOTAL";
export const SET_FETCH_STATE = "SET_FETCH_STATE";
export const SET_LIMIT = "SET_LIMIT";
export const SET_OFFSET = "SET_OFFSET";
export const SET_FILTER = "SET_FILTER";

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
  payload: fetchState, // "NOT_FETCHED", "FETCHING", "FETCHED", "FAILED"
});

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter,
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

// Thunk: Ürünleri Parametrelerle Çek (category, sort, filter)
export const fetchProductsThunk = (params = {}) => async (dispatch) => {
  dispatch(setFetchState("FETCHING"));
  try {
    const queryParams = new URLSearchParams();
    if (params.category) queryParams.append("category", params.category);
    if (params.sort) queryParams.append("sort", params.sort);
    if (params.filter) queryParams.append("filter", params.filter);
    if (params.limit) queryParams.append("limit", params.limit);
    if (params.offset) queryParams.append("offset", params.offset);

    const queryString = queryParams.toString();
    const url = queryString ? `/products?${queryString}` : "/products";

    const res = await api.get(url);
    const data = res.data;

    dispatch(setProductList(data.products || []));
    dispatch(setTotal(data.total || 0));
    dispatch(setFetchState("FETCHED"));
  } catch (err) {
    console.error("Products fetch error:", err);
    dispatch(setFetchState("FAILED"));
  }
};
