import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Index from './pages/Index.js'
import Dashboard from './pages/Dashboard.js'
import Login from './pages/Login.js'
import Navbar from './components/Navbar.js'

const routing = (
  <Router>
    <React.StrictMode>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Index} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/login" component={Login} />
        
      </Switch>
      
    </React.StrictMode>
  </Router>
);
ReactDOM.render(routing,document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

