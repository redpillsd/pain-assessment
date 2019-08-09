import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container, Typography, Box, Grid } from '@material-ui/core';

import Login from './components/LoginForm';
import SignUp from './components/SignUpForm';
import SheetForm from './components/SheetForm';
import Dashboard from './components/Dashboard';
import EvaluationForm from './components/EvaluationForm';

const App = () => {
    return (
        <Router>
            <Container maxWidth="lg"> 
                <Box my={4}>
                    {/* <Grid container justify="center">
                        <Grid item>
                            <Typography variant="h4" component="h1" gutterBottom>
                                Evaluacion del Dolor
                            </Typography>
                        </Grid>
                    </Grid> */}
                    <Switch>
                        <Route exact path="/" component={Login} />
                        <Route exact path="/sign-up" component={SignUp} />
                    </Switch>
                </Box>
                
                {/* <Switch> */}
                    <Route exact path="/sheet" component={SheetForm} />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/evaluation" component={EvaluationForm} />
                {/* </Switch> */}
            </Container>
        </Router>
    );
}

export default App;