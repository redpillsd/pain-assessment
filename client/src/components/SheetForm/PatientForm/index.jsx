import React from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container, InputAdornment } from '@material-ui/core'

import styles from './styles';

import ChipAutocomplete from '../../ChipAutocomplete';
import SelectInput from '../../SelectInput';

import diagnosisList from '../../../mockData/diagnosisList';
import surgeryList from '../../../mockData/surgeryList';

const PatientForm = ({ nextStep, onChange, values }) => {
    const classes = styles();

    const ageUnit = [
        { value: 'Meses', label: 'Meses' },
        { value: 'Años', label: 'Años' },
    ];

    const onClickNextStep = e => {
        e.preventDefault();
        nextStep();
    }

    // TODO add function to cancel the creation of the sheet form

    return (
        <div className={classes.paper}>
            <Typography component="h1" variant="h6">
                Paciente
                </Typography>
            <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                    <Grid item md={6} sm={12} xs={12}>
                        <TextField
                            variant="outlined"
                            margin="dense"
                            required
                            fullWidth
                            id="firstName"
                            label="Nombre"
                            name="firstName"
                            autoFocus
                            onChange={onChange}
                            value={values.firstName}
                        />
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                        <TextField
                            variant="outlined"
                            margin="dense"
                            required
                            fullWidth
                            id="lastName"
                            label="Apellido"
                            name="lastName"
                            onChange={onChange}
                            value={values.lastName}
                        />
                    </Grid>
                    <Grid className={classes.unit} item md={6} sm={12} xs={12}>
                        <Grid item md={8} sm={8} xs={8}>
                            <TextField
                                variant="outlined"
                                margin="dense"
                                required
                                fullWidth
                                id="age"
                                label="Edad"
                                name="age"
                                onChange={onChange}
                                value={values.age}
                            />
                        </Grid>
                        <Grid className={classes.unitSelect} item md={4} sm={4} xs={4}>
                            <SelectInput
                                id={'ageUnit'}
                                name={'ageUnit'}
                                label={'Unidad'}
                                itemList={ageUnit}
                            />
                        </Grid>
                    </Grid>
                    <Grid item md={6} sm={6} xs={6}>
                        <TextField
                            variant="outlined"
                            margin="dense"
                            required
                            fullWidth
                            id="weight"
                            label="Peso"
                            name="weight"
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
                            margin="dense"
                            required
                            fullWidth
                            id="room"
                            label="Habitación"
                            name="room"
                            onChange={onChange}
                            value={values.room}
                        />
                    </Grid>
                    <Grid item md={6} sm={6} xs={6}>
                        <TextField
                            variant="outlined"
                            margin="dense"
                            required
                            fullWidth
                            id="medicalHistoryNumber"
                            label="Nro de HC"
                            name="medicalHistoryNumber"
                            onChange={onChange}
                            value={values.medicalHistoryNumber}
                        />
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                        <ChipAutocomplete 
                            suggestions={diagnosisList}
                            label={'Diagnóstico'}
                            placeHolder={'Escribe una o mas opciones'}
                        />
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                        <ChipAutocomplete 
                            suggestions={surgeryList}
                            label={'Cirugía'}
                            placeHolder={'Escribe una o mas opciones'}
                        />
                    </Grid>
                    <Grid item md={12} sm={12} xs={12}>
                        <TextField
                            variant="outlined"
                            margin="dense"
                            required
                            fullWidth
                            multiline
                            rowsMax="4"
                            id="pathologicalBackground"
                            label="Antecedentes Patológicos"
                            name="pathologicalBackground"
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