import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container, Typography, Box, Grid } from '@material-ui/core';

import Login from './components/auth/Login/Login';
import Register from './components/auth/Register/Register';
import Sheet from './components/Sheet/Sheet'

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
                        <Route exact path="/register" component={Register} />
                    </Switch>
                </Box>
                
                <Switch>
                    <Route exact path="/sheet" component={Sheet} />
                </Switch>
            </Container>
        </Router>
    );
}

export default App;