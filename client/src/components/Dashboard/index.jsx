import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';

import PatientCard from './PacientCard';
import EvaluationCard from './PacientCard/EvaluationCard';

import styles from './styles';

const Dashboard = () => {
    const classes = styles();

    return (
        <Container fixed component="main" maxWidth="xl">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Dashboard
                </Typography>
                <div className={classes.list}>
                    <PatientCard active={true} />
                    <PatientCard active={true} />
                    <PatientCard active={true} />
                    <PatientCard active={true} />
                    <PatientCard active={false} />
                    <PatientCard active={false} />
                </div>
                <Fab color="primary" 
                    aria-label="add" 
                    className={classes.fab}
                    component={Link}
                    href="/sheet">
                    <AddIcon />
                </Fab>
            </div>
        </Container>
    );
}

export default Dashboard;