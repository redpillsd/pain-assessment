import React from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container, InputAdornment } from '@material-ui/core'

import styles from './styles';

const PatientForm = ({ nextStep, onChange, values }) => {
    const classes = styles();

    const onClickNextStep = e => {
        e.preventDefault();
        nextStep();
    }

    // TODO add function to cancel the creation of the sheet form

    return (
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Paciente
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item md={6} sm={12} xs={12}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="firstName"
                                label="Nombre"
                                name="firstName"
                                autoComplete="firstName"
                                autoFocus
                                onChange={onChange}
                                value={values.firstName}
                            />
                        </Grid>
                        <Grid item md={6} sm={12} xs={12}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="lastName"
                                label="Apellido"
                                name="lastName"
                                autoComplete="lastName"
                                autoFocus
                                onChange={onChange}
                                value={values.lastName}
                            />
                        </Grid>
                        <Grid item md={6} sm={6} xs={6}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="age"
                                label="Edad"
                                name="age"
                                autoComplete="age"
                                autoFocus
                                onChange={onChange}
                                value={values.age}
                            />
                        </Grid>
                        <Grid item md={6} sm={6} xs={6}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="weight"
                                label="Peso"
                                name="weight"
                                autoComplete="weight"
                                autoFocus
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
                                }}
                                onChange={onChange}
                                value={values.weight}
                            />
                        </Grid>
                        <Grid item md={6} sm={6} xs={6}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="room"
                                label="Habitación"
                                name="room"
                                autoComplete="room"
                                autoFocus
                                onChange={onChange}
                                value={values.room}
                            />
                        </Grid>
                        <Grid item md={6} sm={6} xs={6}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="medicalHistoryNumber"
                                label="Nro de HC"
                                name="medicalHistoryNumber"
                                autoComplete="medicalHistoryNumber"
                                autoFocus
                                onChange={onChange}
                                value={values.medicalHistoryNumber}
                            />
                        </Grid>
                        <Grid item md={6} sm={12} xs={12}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="diagnosis"
                                label="Diagnóstico"
                                name="diagnosis"
                                autoComplete="diagnosis"
                                autoFocus
                                onChange={onChange}
                                value={values.diagnosis}
                            />
                        </Grid>
                        <Grid item md={6} sm={12} xs={12}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="surgery"
                                label="Cirugía"
                                name="surgery"
                                autoComplete="surgery"
                                autoFocus
                                onChange={onChange}
                                value={values.surgery}
                            />
                        </Grid>
                        <Grid item md={12} sm={12} xs={12}>
                            {/* TODO opcional add a radio button */}
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                multiline
                                rowsMax="4"
                                id="pathologicalBackground"
                                label="Antecedentes Patológicos"
                                name="pathologicalBackground"
                                autoComplete="pathologicalBackground"
                                autoFocus
                                onChange={onChange}
                                value={values.pathologicalBackground}
                            />
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
                            >
                                Cancelar
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
            </div>
    );
}

export default PatientForm;