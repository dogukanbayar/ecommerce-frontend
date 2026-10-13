import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { clientReducer } from './reducers/clientReducer';

const rootReducer = combineReducers({
  client: clientReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
