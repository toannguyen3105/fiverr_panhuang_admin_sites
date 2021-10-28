import { combineReducers } from "redux";
import authReducers from "./authReducer";
import configurationReducers from "./configurationReducer";
import postReducers from "./postReducer";
import productReducers from "./productReducer";
import transactionReducers from "./transactionReducer";
import userReducers from "./userReducer";

const reducers = combineReducers({
  posts: postReducers,
  users: userReducers,
  products: productReducers,
  transactions: transactionReducers,
  auth: authReducers,
  configurations: configurationReducers,
});

const Todo = (state, action) => reducers(state, action);
export default Todo;
