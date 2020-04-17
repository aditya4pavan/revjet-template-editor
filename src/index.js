import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path='/:uid' component={App} />
      <Route path='/' render={() => <h4 className='text-center p-5'>Welcome to Delasoft WYSiWYG Engine</h4>} />
    </Switch>
  </Router>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
let elem = document.getElementById('root');
elem.classList.add('h-100')
serviceWorker.unregister();
