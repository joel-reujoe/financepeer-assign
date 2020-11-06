import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { applyMiddleware, compose, createStore } from 'redux'
import { Provider} from 'react-redux';
import reducer from './store/reducers/auth';
import thunk from 'redux-thunk';



reportWebVitals();

const composeEnhances = compose
const store = createStore(reducer, composeEnhances(
  applyMiddleware(thunk)
))


const app = (
  <Provider store={store}>
    <App />
  </Provider>
)
ReactDOM.render(app,document.getElementById('root'));