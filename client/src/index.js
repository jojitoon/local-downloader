import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { StoreContext } from "redux-react-hook";

import store from "./store/index";
import {getMessages} from "./store/actions/messages";

store.dispatch(getMessages())

ReactDOM.render(<StoreContext.Provider value={store}><App /></StoreContext.Provider>, document.getElementById('root'));

