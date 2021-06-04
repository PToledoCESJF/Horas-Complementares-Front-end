import React from 'react';
import { BrowserRouter, Switch, Route, Redirect, } from 'react-router-dom';

import Home from './pages/home'

const Routes: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Redirect exact from="/*" to="/home" />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;