import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login/Login';
import Register from './components/auth/Register/Register';


import './App.css';

const App = () => {
    return(
        <Router>
            <Fragment>
                {/* <Navbar></Navbar> */}
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/register" component={Register} />
                </Switch>
                <section className="container">
                    
                </section>
            </Fragment>
        </Router>
    );
}

export default App;
