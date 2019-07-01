import React from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container, Fab, InputAdornment } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

/*  
    The breakpoint **start** at this value.
    For instance with the first breakpoint xs: [xs, sm[.
    const values = {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
    }; 
*/

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(0),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    fixAdd: {
        display: 'flex',
    },
    add: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(2),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
const DrugForm = () => {
    const classes = useStyles();

    return (
        <div className={classes.paper}>
            <Grid item md={12} sm={12} xs={12}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="drug"
                    label="Droga"
                    name="drug"
                    autoComplete="drug"
                    autoFocus
                />
            </Grid>
            <Grid className={classes.fixAdd}>
                <Grid item md={11} sm={11} xs={11} >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="dose"
                        label="Cantidad"
                        name="dose"
                        autoComplete="dose"
                        autoFocus
                        InputProps={{
                            endAdornment: <InputAdornment position="end">%</InputAdornment>,
                        }}
                    />
                </Grid>
                <div className={classes.add}>
                    <Fab size="small" color="secondary" aria-label="Add">
                        <AddIcon />
                    </Fab>
                </div>
            </Grid>
            
        </div>
    );
}

export default DrugForm;