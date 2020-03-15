import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { Formik } from 'formik';
import * as Yup from 'yup';
import _isEmpty from 'lodash/isEmpty';
import DrugForm from '../DrugForm';
import ChipSelectMultiple from '../../ui/ChipSelectMultiple';
import ErrorsMessage from '../../ui/ErrorsMessage';
import PatientCard from '../../ui/PatientCard';
import styles from './styles';

import lockTypeList from '../../../mockData/lockTypeList';

const LockForm = ({ nextStep, prevStep, handleCheckbox, lock, setLock, useLock, useLockClass, patient }) => {
    const classes = styles();

    const [direction, setDirection] = useState('nextStep');

    const calculateTotalVolume = (drugsArr) => {
        let totalDose = 0;
        if (drugsArr && drugsArr.length > 0) {
            for (let i of drugsArr) {
                if (i.dose !== '') {
                    totalDose += parseInt(i.dose);
                }
            }
        }
        return totalDose;
    }

    const validationSchema = () => {
        if (useLock) {
            return Yup.object({
                type: Yup.array()
                    .min(1, 'Elige por lo menos una de las opciones')
                    .of(
                        Yup.string().required(),
                    ),
                // totalVolume: Yup.string()
                //     .required('Este campo es requerido')
                //     .matches(/^[0-9]*$/, 'Este campo debe ser numérico'),
                drugs: Yup.array()
                    .min(1, 'Agrega por lo menos una de las opciones')
                    .of(
                        Yup.object().shape({
                            name: Yup.string().required('Este campo es obligatorio'),
                            dose: Yup.string()
                                .required('Este campo es requerido')
                                .matches(/^[0-9]*$/, 'Este campo debe ser numérico'),
                        })
                    ),
            });
        }

        return Yup.mixed().notRequired();
    }

    return (
        <Formik
            enableReinitialize={true}
            initialValues={(() => {
                if (useLock && !_isEmpty(lock)) {
                    console.log('@@ 1', lock)
                    return lock;
                } else if (useLock && _isEmpty(lock)) {
                    console.log('@@ 2', lock)
                    return(
                        {
                            type: [],
                            totalVolume: '',
                            drugs: [
                                {
                                    name: '',
                                    dose: ''
                                }
                            ]
                        }
                    );
                } else if (!useLock) {
                    console.log('@@ 4', lock)
                    if (!_isEmpty(lock)) {
                        setLock({});
                        return {};
                    }
                    return {};
                }
            })()}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                console.log('@@@ Lock values ->',values);
                setLock(values)
                direction === 'prevStep' ? prevStep() : nextStep();
            }}
        >
            {(props) => {
                const {
                    values,
                    errors,
                    touched,
                    handleChange,
                    setFieldValue,
                    handleSubmit,
                } = props;

                return (
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h6">
                            Bloqueo
                        </Typography>
                        <div>
                            <pre>{JSON.stringify(props, null, 2)}</pre>
                        </div>
                        <PatientCard fullCard={false} />
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
                                            name={'type'}
                                            label={'Tipo de Bloqueo/s'}
                                            itemList={lockTypeList}
                                            value={values.type}
                                            selectedValues={values.type}
                                            required={true}
                                            formikSetFieldValue={setFieldValue}
                                            errors={!!(touched.type && errors.type)}
                                        />
                                        <ErrorsMessage errors={touched.type && errors.type}/>
                                    </Grid>
                                    <Grid item md={12} sm={12} xs={12}>
                                        <DrugForm 
                                            formikProps={props}
                                        />
                                        {/* <ErrorsMessage errors={touched.drugs && errors.drugs}/> */}
                                    </Grid>
                                    <Grid item md={12} sm={12} xs={12}>
                                        <FormControl fullWidth>
                                            <TextField
                                                variant="outlined"
                                                margin="dense"
                                                disabled
                                                fullWidth
                                                label="Volumen Total"
                                                name="totalVolume"
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end">ml</InputAdornment>,
                                                }}
                                                value={values.totalVolume = calculateTotalVolume(values.drugs) || ''}
                                            />
                                        </FormControl>
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
                                        name="prevStep"
                                        className={classes.submit}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (e.currentTarget.name !== direction) {
                                                setDirection(e.currentTarget.name)
                                            }
                                            handleSubmit()}}
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
                                        name="nextStep"
                                        className={classes.submit}
                                        onClick={(e) => {e.preventDefault();
                                            if (e.currentTarget.name !== direction) {
                                                setDirection(e.currentTarget.name)
                                            };
                                            handleSubmit()}}
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