import React from 'react';
import ReactDOM from 'react-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import ownerReducer from './redux/reducers/ownerReducer';
import cartReducer from './redux/reducers/cartReducer';
import messageReducer from './redux/reducers/messageReducer';
import inquiryReducer from './redux/reducers/inquiryReducer';
import listingReducer from './redux/reducers/listingReducer';

const rootReducer = combineReducers({
  ownerReducer,
  cartReducer,
  messageReducer,
  inquiryReducer,
  listingReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(applyMiddleware(thunk)));
const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '6px',
  transition: transitions.SCALE
}


ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
