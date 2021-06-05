import React from 'react';
import { BrowserRouter, Switch, Route, Redirect, } from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';

const Routes: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Login />
                </Route>
                <Redirect exact from="/*" to="/home" />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;