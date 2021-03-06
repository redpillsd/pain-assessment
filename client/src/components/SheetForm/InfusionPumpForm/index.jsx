import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import _map from 'lodash/map';
import { Formik } from 'formik';
import * as Yup from 'yup';
import ChipSelectMultiple from '../../ui/ChipSelectMultiple';
import ErrorsMessage from '../../ui/ErrorsMessage';
import PatientCard from '../../ui/PatientCard';
import styles from './styles';

import infusionPumpDrugsList from '../../../mockData/infusionPumpDrugsList';

const InfusionPumpForm = ({ nextStep, prevStep, handleCheckbox, infusionPump, setInfusionPump, useInfusionPump, useInfusionPumpClass, patient }) => {
    const classes = styles();

    const [direction, setDirection] = useState('nextStep');

    const[drugsData, setDrugsData] = useState([]);

    useEffect(() =>{
        const { weight } = patient;
        setDrugsData(calculateDose(infusionPumpDrugsList, weight));
    }, []);

    const calculateDose = (list, weight) => {
        let calculatedDoseArray = [];
        _map(list, i => {
            let label = `${i.label} ${i.value} mg/kg -> ${Math.trunc(i.value * parseInt(weight))} mg`,
                value = label;
            calculatedDoseArray.push({ label, value })
        })

        return calculatedDoseArray;
    }

    const validationSchema = () => {
        if (useInfusionPump) {
            return Yup.object({
                infusionRate: Yup.string()
                    .required('Este campo es requerido')
                    .matches(/^[0-9]*$/, 'Este campo debe ser numérico'),
                drugs: Yup.array()
                    .min(1, 'Elige por lo menos una de las opciones')
                    .of(
                        Yup.string().required(),
                    ),
            });
        }
        setInfusionPump({});
        return Yup.mixed().notRequired();
    }

    return (
        <Formik
            enableReinitialize={true}
            initialValues={infusionPump}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                console.log('@@@ InfusionPump values ->',values);
                setInfusionPump(values);
                direction === 'prevStep' ? prevStep() : nextStep();
            }}
        >
            {(props) => {
                const {
                    values,
                    errors,
                    handleChange,
                    setFieldValue,
                    handleSubmit,
                } = props;

                return (
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h6">
                            Bomba de Infusión
                        </Typography>
                        <div>
                            <pre>{JSON.stringify(props, null, 2)}</pre>
                        </div>
                        <PatientCard fullCard={false} />
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
                                                label="Ritmo de Infusión"
                                                name="infusionRate"
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end">ml/hora</InputAdornment>,
                                                }}
                                                onChange={handleChange}
                                                value={values.infusionRate || ''}
                                                error={!!(errors.infusionRate)}
                                            />
                                            <ErrorsMessage errors={errors.infusionRate} />
                                        </FormControl>
                                    </Grid>
                                    <Grid item md={12} sm={12} xs={12}>
                                        <ChipSelectMultiple 
                                            name={'drugs'}
                                            label={'Droga/s'}
                                            itemList={drugsData}
                                            value={values.drugs}
                                            selectedValues={values.drugs}
                                            required={true}
                                            formikSetFieldValue={setFieldValue}
                                            errors={!!errors.drugs}
                                        />
                                        <ErrorsMessage errors={errors.drugs}/>
                                    </Grid>
                                    <Grid item md={12} sm={12} xs={12}>
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
                                            value={values.totalVolume = 500 || ''}
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
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (e.currentTarget.name !== direction) {
                                                setDirection(e.currentTarget.name)
                                            }
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

export default InfusionPumpForm;