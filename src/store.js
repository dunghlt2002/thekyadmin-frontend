import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';

import { userReducer } from './reducers/userReducers';
import { productDetailsReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers'

const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON('userInfo') || null;
console.log('userinfo from Cookie in store' + JSON.stringify(userInfo));

//const initialState = {};  // nguoc voi dong o duoi, dung luc dau chua co Cart
// const initialState = { cart: { cartItems, shipping: {}, payment: {} }, userSignin: { userInfo } };
const initialState = { cart: { cartItems, shipping: {}, payment: {} }, userSignin: { userInfo } };

// dang works luc chua co cart
// const initialState = { userSignin: {userInfo} };


const reducer = combineReducers({
  cart: cartReducer,
  productDetails: productDetailsReducer,
  userSignin: userReducer
  
})
//composeEnhancer de cho extension REDUX tren google chrome work tot - Dung 
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
store.subscribe(function(){
  console.log('trong store ne ' + JSON.stringify(store.getState()));
})
export default store;
