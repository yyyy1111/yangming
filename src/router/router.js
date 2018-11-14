import React from 'react';
import {BrowserRouter as Router , Route, Switch,Link} from 'react-router-dom'

import Bundle from './Bundle' ;
import Home from 'pages/Home/Home';
import Page1 from 'pages/Page1/Page1';
import Counter from 'pages/Counter/Counter';
import Userinfo from 'pages/UserInfo/UserInfo' ;
import Notfound from 'bundle-loader?lazy&name=notFound!pages/NotFound/NotFound';
import Loading  from 'components/Loading/Loading'

const Createcomponent = (Component) => (props) => (
    <Bundle load={Component}>
        {
            (Component) => Component ? <Component {...props}/> : <Loading />
        }
    </Bundle>
)

const getRouter = () =>(
    <Router>
        <div>
            
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/page1"  component={Page1}/>
                <Route path="/counter"  component={Counter}/>
                <Route path="/userinfo"  component={Userinfo}/>
                <Route  component={Createcomponent(Notfound)}/>
            </Switch>
        </div>
    </Router>
);
export  default getRouter;
