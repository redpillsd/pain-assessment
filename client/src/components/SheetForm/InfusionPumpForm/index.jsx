import React, { Fragment, useState, useEffect } from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, FormControl, Container, Fab, InputAdornment } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import _map from 'lodash/map';

import styles from './styles';

import ChipAutocomplete from '../../ui/ChipAutocomplete';
import ChipSelectMultiple from '../../ui/ChipSelectMultiple';

import ErrorsMessage from '../../ui/ErrorsMessage';

import { Formik } from 'formik';
import * as Yup from 'yup';
import _isEmpty from 'lodash/isEmpty';

import infusionPumpDrugsList from '../../../mockData/infusionPumpDrugsList';

const InfusionPumpForm = ({ /* formikProps, */ nextStep, prevStep, handleCheckbox, infusionPump, setInfusionPump, useInfusionPump, useInfusionPumpClass, weight }) => {
    const classes = styles();

    /* const { weight } = values.patient; */

    const[drugsData, setDrugsData] = useState([]);

    useEffect(() =>{
        setDrugsData(calculateDose(infusionPumpDrugsList, weight));
    }, []);

    const calculateDose = (list, weight) => {
        let calculatedDoseArray = [];
        _map(list, i => {
            let label = `${i.label} ${i.value} mg/kg -> ${Math.trunc(i.value * weight)} mg`,
                value = label;
            calculatedDoseArray.push({ label, value })
        })

        return calculatedDoseArray;
    }

    const validationSchema = Yup.object({
        infusionPump: Yup.lazy(value => {
            if (!_isEmpty(value)) {
                return Yup.object().shape({
                    totalVolume: Yup.string()
                        .required('Este campo es requerido'),
                    infusionRate: Yup.string()
                        .required('Este campo es requerido'),
                    drugs: Yup.array()
                        .min(1, 'Elige por lo menos una de las opciones')
                        .of(
                            Yup.object().shape({
                                name: Yup.string().required(),
                                dose: Yup.string().required(),
                            })
                        ),
                })
            }
            return Yup.mixed().notRequired();
        })
    });

    return (
        <Formik
            initialValues={infusionPump}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                // console.log('@@@ step ->', step);
                // if (step === 4) {
                    setSubmitting(true);
                    
                    if (useInfusionPump) { 
                        setInfusionPump(values)
                    } else {
                        setInfusionPump({infusionPump: {}})
                    }
                    console.log(infusionPump)
                    /* nextStep(); */
                // } else {
                //     nextStep()
                // }
            }}
        >
            {(props) => {
                const {
                    values,
                    touched,
                    errors,
                    dirty,
                    isSubmitting,
                    isValidating,
                    isValid,
                    handleChange,
                    setFieldValue,
                    handleBlur,
                    handleSubmit,
                    handleReset,
                } = props;
                
                const eInfusionPump = errors && errors.infusionPump,
                    eTotalVolume = eInfusionPump && eInfusionPump.totalVolume,
                    eInfusionRate = eInfusionPump && eInfusionPump.infusionRate;

                const tInfusionPump = touched && touched.infusionPump,
                    tTotalVolume = tInfusionPump && tInfusionPump.totalVolume,
                    tInfusionRate = tInfusionPump && tInfusionPump.infusionRate;

                return (
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h6">
                            Bomba de Infusión
                        </Typography>
                        <div>
                            <pre>{JSON.stringify(props, null, 2)}</pre>
                        </div>
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
                                        <FormControl fullWidth>
                                            <TextField
                                                variant="outlined"
                                                margin="dense"
                                                required
                                                fullWidth
                                                label="Volumen Total"
                                                name="infusionPump.totalVolume"
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end">ml</InputAdornment>,
                                                }}
                                                onChange={handleChange}
                                                value={values.infusionPump.totalVolume}
                                                error={!!(tTotalVolume && eTotalVolume)}
                                            />
                                            <ErrorsMessage errors={tTotalVolume && eTotalVolume} />
                                        </FormControl>
                                    </Grid>
                                    <Grid item md={12} sm={12} xs={12}>
                                        <TextField
                                            variant="outlined"
                                            margin="dense"
                                            required
                                            fullWidth
                                            label="Ritmo de Infusión"
                                            name="infusionPump.infusionRate"
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
                                            name={'infusionPump.drugs'}
                                            label={'Droga/s'}
                                            itemList={drugsData}
                                            value={values.infusionPump.drugs}
                                            required={true}
                                            formikSetFieldValue={setFieldValue}
                                            // errors={!!(tType && eType)}
                                        />
                                        {/* <ErrorsMessage errors={tType && eType}/> */}
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
                                        onClick={prevStep}
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
                                        onClick={nextStep}
                                    >
                                        Siguiente
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                );
            }}
        </Formik>
    );
}

export default InfusionPumpForm;