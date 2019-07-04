import React, { Fragment, useState, useEffect } from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container, Fab, InputAdornment } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import _map from 'lodash/map';

import styles from './styles';

import ChipAutocomplete from '../../ChipAutocomplete';
import ChipSelectMultiple from '../../ChipSelectMultiple';

import infusionPumpDrugsList from '../../../mockData/infusionPumpDrugsList';

const InfusionPumpForm = ({ nextStep, prevStep, onChange, values }) => {
    const classes = styles();

    const { weight } = values;

    const [useInfusionPump, setUseInfusionPump] = useState(true);
    const [useInfusionPumpClass, setUseInfusionPumpClass] = useState(classes.show);

    const[drugsData, setDrugsData] = useState([]);

    useEffect(() =>{
        setDrugsData(calculateDose(infusionPumpDrugsList, weight));
    }, []);

    const onClickNextStep = e => {
        e.preventDefault();
        nextStep();
    }

    const onClickPrevStep = e => {
        e.preventDefault();
        prevStep();
    }

    const calculateDose = (list, weight) => {
        let calculatedDoseArray = [];
        _map(list, i => {
            let label = `${i.label} ${i.value} mg/kg -> ${Math.trunc(i.value * weight)} mg`,
                value = label;
            calculatedDoseArray.push({ label, value })
        })

        return calculatedDoseArray;
    }

    const handleCheckbox = e => {
        setUseInfusionPump(e.target.checked);
        useInfusionPump ? setUseInfusionPumpClass(classes.hide) : setUseInfusionPumpClass(classes.show);
    };

    return (
        <div className={classes.paper}>
            <Typography component="h1" variant="h6">
                Bomba de Infusión
            </Typography>
            <Grid container spacing={2}>
                <Grid item md={12} sm={12} xs={12}>
                    <FormControlLabel
                        checked={useInfusionPump}
                        className={classes.checkbox}
                        control={<Checkbox color="primary" />}
                        label="Agregar Bomba de Infusión"
                        labelPlacement="start"
                        onChange={handleCheckbox}
                    />
                </Grid>
            </Grid>
            <form className={classes.form} noValidate>
                <div className={useInfusionPumpClass}>
                    <Grid container spacing={2}>
                        <Grid item md={12} sm={12} xs={12}>
                            <TextField
                                variant="outlined"
                                margin="dense"
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
                                margin="dense"
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
                        {/* <Grid item md={12} sm={12} xs={12}>
                            <ChipAutocomplete 
                                suggestions={drugsData}
                                label={'Droga'}
                                placeHolcer={'Selecciona una o mas opciones'}
                            />
                        </Grid> */}
                        <Grid item md={12} sm={12} xs={12}>
                            <ChipSelectMultiple 
                                id={'drug'}
                                name={'drug'}
                                label={'Droga/s'}
                                itemList={drugsData}
                            />
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
            {/* <Fab size="medium" color="secondary" aria-label="Add" className={classes.fab}>
                <AddIcon />
            </Fab> */}
        </div>
    );
}

export default InfusionPumpForm;