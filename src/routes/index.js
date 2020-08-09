import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from '../components/Home';
import CountryDetails from '../components/CountryDetailCard';
function Routes(props) {
    return (
        <BrowserRouter>
            {props.children}
            <Switch>
                <Route exact path="/"
                    component={Home}
                />
                <Route exact path="/country/:name"
                    component={CountryDetails}
                />
                <Route path='*' exact component={() => <h3 style={{textAlign:"center",marginTop:"50px"}}>404 Page Not Found</h3>} />
            </Switch>
        </BrowserRouter>
    )
}
export default Routes;