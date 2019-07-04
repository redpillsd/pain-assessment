import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container, Fab, InputAdornment } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import styles from './styles';

import DrugForm from '../DrugForm';
import ChipSelectMultiple from '../../ChipSelectMultiple';
import SelectInput from '../../SelectInput';

import lockTypeList from '../../../mockData/lockTypeList';

const LockForm = ({ nextStep, prevStep, onChange, values }) => {
    const classes = styles();

    const [useLock, setUseLock] = useState(true);
    const [useLockClass, setUseLockClass] = useState(classes.show);

    const onClickNextStep = e => {
        e.preventDefault();
        nextStep();
    };

    const onClickPrevStep = e => {
        e.preventDefault();
        prevStep();
    };

    const handleCheckbox = e => {
        setUseLock(e.target.checked);
        useLock ? setUseLockClass(classes.hide) : setUseLockClass(classes.show);
    };

    return (
        <div className={classes.paper}>
            <Typography component="h1" variant="h6">
                Bloqueo
            </Typography>
            <Grid container spacing={2}>
                <Grid item md={12} sm={12} xs={12}>
                    <FormControlLabel
                        checked={useLock}
                        className={classes.checkbox}
                        control={<Checkbox color="primary" />}
                        label="Agregar Bloqueo"
                        labelPlacement="start"
                        onChange={handleCheckbox}
                    />
                </Grid>
            </Grid>
            <form className={classes.form} noValidate>
                <div className={useLockClass}>
                    <Grid container spacing={2}>
                        <Grid item md={12} sm={12} xs={12}>
                            <ChipSelectMultiple 
                                id={'lockType'}
                                name={'lockType'}
                                label={'Tipo de Bloqueo/s'}
                                itemList={lockTypeList}
                            />
                        </Grid>
                        <Grid item md={12} sm={12} xs={12}>
                            <TextField
                                variant="outlined"
                                margin="dense"
                                required
                                fullWidth
                                id="totalVolume"
                                label="Volumen Total"
                                name="totalVolume"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">ml</InputAdornment>,
                                }}
                            />
                        </Grid>
                        <Grid item md={12} sm={12} xs={12}>
                            <DrugForm></DrugForm>
                        </Grid>
                        <Grid item md={12} sm={12} xs={12}>
                            <DrugForm></DrugForm>
                        </Grid>
                        <Grid item md={12} sm={12} xs={12}>
                            <DrugForm></DrugForm>
                        </Grid>
                    </Grid>
                </div>
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
        </div>
    );
}

export default LockForm;