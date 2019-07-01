import React, { Fragment } from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container, Fab, InputAdornment } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import styles from './styles';

import DrugForm from '../DrugForm';

const InfusionPumpForm = ({ nextStep, prevStep, onChange, values }) => {
    const classes = styles();

    const onClickNextStep = e => {
        e.preventDefault();
        nextStep();
    }

    const onClickPrevStep = e => {
        e.preventDefault();
        prevStep();
    }

    return (
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Bomba de Infusión
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item md={12} sm={12} xs={12}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="totalVolume"
                                label="Volumen Total"
                                name="totalVolume"
                                autoComplete="totalVolume"
                                autoFocus
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">ml</InputAdornment>,
                                }}
                            />
                        </Grid>
                        <Grid item md={12} sm={12} xs={12}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="infusionRate"
                                label="Ritmo de Infusión"
                                name="infusionRate"
                                autoComplete="infusionRate"
                                autoFocus
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">ml/hora</InputAdornment>,
                                }}
                            />
                        </Grid>
                        <Grid item md={12} sm={12} xs={12}>
                            <DrugForm></DrugForm>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item md={6} sm={6} xs={6}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="secondary"
                                className={classes.submit}
                                onClick={onClickPrevStep}
                            >
                                Anterior
                            </Button>
                        </Grid>
                        <Grid item md={6} sm={6} xs={6}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={onClickNextStep}
                            >
                                Siguiente
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <Fab size="medium" color="secondary" aria-label="Add" className={classes.fab}>
                    <AddIcon />
                </Fab>
            </div>
    );
}

export default InfusionPumpForm;