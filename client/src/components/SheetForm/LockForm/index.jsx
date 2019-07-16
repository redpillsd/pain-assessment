import React, { Fragment, useState, useEffect } from 'react';
import { Button, TextField, FormControl, FormControlLabel, Checkbox, Grid, Typography, InputAdornment } from '@material-ui/core';
import _map from 'lodash/map';

import styles from './styles';

import DrugForm from '../DrugForm';
import ChipSelectMultiple from '../../ui/ChipSelectMultiple';

import lockTypeList from '../../../mockData/lockTypeList';

import ErrorsMessage from '../../ui/ErrorsMessage';

import { Formik } from 'formik';
import * as Yup from 'yup';
import _isEmpty from 'lodash/isEmpty';

const LockForm = ({ nextStep, prevStep, handleCheckbox, lock, setLock, useLock, useLockClass }) => {
    const classes = styles();

    const [lockObj, setLockObj] = useState({});

    const validationSchema = Yup.object({
        lock: Yup.lazy(values => {
            console.log('@values',values)
            if (values !== undefined) {
                return Yup.object().shape({
                    type: Yup.string()
                        .required('Este campo es requerido'),
                    totalVolume: Yup.string()
                        .required('Este campo es requerido'),
                    /* drugs: Yup.array()
                        .min(1, 'Agregar por lo menos una')
                        .of(
                            Yup.object().shape({
                                name: Yup.string().required(),
                                dose: Yup.string().required(),
                            })
                        ), */
                })
            }
            return Yup.mixed().notRequired();
        })
    });

    const onAddNewDrug = () => {
        console.log('@@@ added');
    };

    return (
        <Formik
            initialValues={lock}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                // console.log('@@@ step ->', step);
                // if (step === 4) {
                    setSubmitting(true);
                    
                    if (useLock) { 
                        setLock(values)
                    } else {
                        setLock({lock: {}})
                    }
                    console.log(lock)
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
                
                const eLock = errors && errors.lock,
                    eType = eLock && eLock.type,
                    eTotalVolume = eLock && eLock.totalVolume;

                const tLock = touched && touched.lock,
                    tType = tLock && tLock.type,
                    tTotalVolume = tLock && tLock.totalVolume;

                return (
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h6">
                            Bloqueo
                        </Typography>
                        <div>
                            <pre>{JSON.stringify(props, null, 2)}</pre>
                        </div>
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
                                <Button
                                    type="button"
                                    fullWidth
                                    variant="contained"
                                    color="secondary"
                                    className={classes.submit}
                                    onClick={() => setLockObj({lock: {
                                        type: '',
                                        totalVolume: '',
                                        drugs: [],
                                    }})}
                                >
                                    Agregar Bloqueo
                                </Button>
                            </Grid>
                        </Grid>
                        <form className={classes.form} noValidate>
                            <div className={useLockClass}>
                                <Grid container spacing={2}>
                                    <Grid item md={12} sm={12} xs={12}>
                                        <ChipSelectMultiple 
                                            name={'lock.type'}
                                            label={'Tipo de Bloqueo/s'}
                                            itemList={lockTypeList}
                                            value={values.lock.type}
                                            required={true}
                                            formikSetFieldValue={setFieldValue}
                                            errors={!!(tType && eType)}
                                        />
                                        <ErrorsMessage errors={tType && eType}/>
                                    </Grid>
                                    <Grid item md={12} sm={12} xs={12}>
                                        <FormControl fullWidth>
                                            <TextField
                                                variant="outlined"
                                                margin="dense"
                                                required
                                                fullWidth
                                                label="Volumen Total"
                                                name="lock.totalVolume"
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end">ml</InputAdornment>,
                                                }}
                                                onChange={handleChange}
                                                value={values.lock.totalVolume}
                                                error={!!(tTotalVolume && eTotalVolume)}
                                            />
                                            <ErrorsMessage errors={tTotalVolume && eTotalVolume} />
                                        </FormControl>
                                    </Grid>
                                    <Grid item md={12} sm={12} xs={12}>
                                        <DrugForm 
                                            addNewDrug={() => onAddNewDrug()}
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
                                        onClick={handleSubmit}
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

export default LockForm;