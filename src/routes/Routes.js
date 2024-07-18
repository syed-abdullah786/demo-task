import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../pages/HomePage';
import Fav from '../pages/Favourite';
import Header from '../components/Header';
import Visited from '../pages/Visited';

const Routes = () => {
  return (
    <Router>
      <Header/>
      <Switch>       
        <Route exact path="/favorite" component={Fav} />
        <Route exact path="/visited" component={Visited} />
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
};

export default Routes;
