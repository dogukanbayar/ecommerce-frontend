import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { clientReducer } from "./reducers/clientReducer";
import { productReducer } from "./reducers/productReducer";

const rootReducer = combineReducers({
  client: clientReducer,
  product: productReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
