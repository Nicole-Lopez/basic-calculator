import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from '../reducer/index';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancer(applyMiddleware()));

export default store;