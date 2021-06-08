import React from 'react';
import {lazy, Suspense} from 'react';
import * as ROUTES from "../constants/routes";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../../next_server/pages/index";
import { ApolloProvider } from '@apollo/react-hooks'
import client from './client'
//const Home = lazy(() => import("../../next_server/pages/index"));
const Test = lazy(() => import('../components/test'));
export default function App() {
    return (
      <Router>
        <ApolloProvider client={client}>
          <Suspense fallback={<Home/>}>
            <Switch>
              <Route exact path={ROUTES.HOME} component={Home}/>
              <Route exact path={ROUTES.TEST} component={Test}/>
              <Route component={Home}/>
            </Switch>
          </Suspense>
        </ApolloProvider>
      </Router>
    )
}