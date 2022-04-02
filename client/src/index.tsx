import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/layout/App';
import {BrowserRouter} from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store/configureStore';
import AdminApp from "./Admin/AdminApp";

const location = window.location.pathname

location.includes('admin')  ?
ReactDOM.render(
      <BrowserRouter>
          <Provider store={store}>
              <AdminApp/>
          </Provider>
      </BrowserRouter>,
      document.getElementById('root')
)
:
ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
