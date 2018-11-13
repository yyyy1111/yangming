import React from 'react';
import {BrowserRouter as Router , Route, Switch,Link} from 'react-router-dom'

import Bundle from './Bundle' ;

import Home from 'pages/Home/Home';
import Page1 from 'pages/Page1/Page1';
import Counter from 'pages/Counter/Counter';
import UserInfo from 'pages/UserInfo/UserInfo' ;

const Loading = function () {
    return <div>Loading...</div>
};

const createComponent = (component) => (props) => (
    <Bundle load={component}>
        {
            (Component) => Component ? <Component {...props}/> : <Loading/>
        }
    </Bundle>
)

const getRouter = () =>(
    <Router>
        <div>
            <ul>
               <li><Link to="/">首页</Link></li>
               <li><Link to="/page1">Page1</Link></li> 
               <li><Link to="/counter">Counter</Link></li>
               <li><Link to="/userinfo">UserInfo</Link></li>
            </ul>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/page1"  component={Page1}/>
                <Route path="/counter"  component={Counter}/>
                <Route path="/userinfo"  component={UserInfo}/>
            </Switch>
        </div>
    </Router>
);
export  default getRouter;
