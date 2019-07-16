import React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';

import styles from './styles';

import ChipAutocomplete from '../../ui/ChipAutocomplete';
import SelectInput from '../../ui/SelectInput';

import ErrorsMessage from '../../ui/ErrorsMessage';

import diagnosisList from '../../../mockData/diagnosisList';
import surgeryList from '../../../mockData/surgeryList';

import { Formik } from 'formik';
import * as Yup from 'yup';

const PatientForm = ({ patient, setPatient, nextStep }) => {
    const classes = styles();

    const validationSchema = Yup.object({
        patient: Yup.object({
            firstName: Yup.string()
                .required('Este campo es requerido'),
            lastName: Yup.string()
                .required('Este campo es requerido'),
            age: Yup.object({
                value: Yup.string()
                    .required('Este campo es requerido')
                    .matches(/^[0-9]*$/, 'Este campo debe ser numérico'),
                unit: Yup.string()
                    .required('Este campo es requerido'),
            }),
            weight: Yup.string()
                .required('Este campo es requerido')
                .matches(/^[0-9]*$/, 'Este campo debe ser numérico'),
            room: Yup.string()
                .required('Este campo es requerido'),
            medicalHistoryNumber: Yup.string()
                .required('Este campo es requerido'),
            diagnosis: Yup.array()
                .min(1, 'Elige por lo menos una de las opciones')
                .of(
                    Yup.string().required(),
                ),
            surgery: Yup.array()
                .min(1, 'Elige por lo menos una de las opciones')
                .of(
                    Yup.string().required(),
                ),
        })
    });

    const ageUnit = [
        { value: 'Años', label: 'Años' },
        { value: 'Meses', label: 'Meses' },
        { value: 'Dias', label: 'Días' },
    ];

    // TODO add function to cancel the creation of the sheet form

    return (
        <Formik
            initialValues={patient}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true);
                    console.log('@@@ Patient values ->',values);
                    setPatient(values)
                    nextStep();
            }}
        >
            {(props) => {
                const {
                    values,
                    touched,
                    errors,
                    handleChange,
                    setFieldValue,
                    handleSubmit,
                    handleReset,
                } = props;

                const ePatient = errors && errors.patient,
                    eFirstName = ePatient && ePatient.firstName,
                    eLastName = ePatient && ePatient.lastName,
                    eAge = ePatient && ePatient.age,
                    eAgeValue = eAge && eAge.value,
                    eAgeUnit = eAge && eAge.unit,
                    eWeight = ePatient && ePatient.weight,
                    eRoom = ePatient && ePatient.room,
                    eMedicalHistoryNumber = ePatient && ePatient.medicalHistoryNumber,
                    eDiagnosis = ePatient && ePatient.diagnosis,
                    eSurgery = ePatient && ePatient.surgery;

                const tPatient = touched && touched.patient,
                    tFirstName = tPatient && tPatient.firstName,
                    tLastName = tPatient && tPatient.lastName,
                    tAge = tPatient && tPatient.age,
                    tAgeValue = tAge && tAge.value,
                    tAgeUnit = tAge && tAge.unit,
                    tWeight = tPatient && tPatient.weight,
                    tRoom = tPatient && tPatient.room,
                    tMedicalHistoryNumber = tPatient && tPatient.medicalHistoryNumber,
                    tDiagnosis = tPatient && tPatient.diagnosis,
                    tSurgery = tPatient && tPatient.surgery;
                    
                return (
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h6">
                            Paciente
                        </Typography>
                        {/* <div>
                            <pre>{JSON.stringify(props, null, 2)}</pre>
                        </div> */}
                        <form className={classes.form} noValidate>
                            <Grid container spacing={2}>
                                <Grid item md={6} sm={12} xs={12}>
                                    <FormControl fullWidth>
                                        <TextField
                                            variant="outlined"
                                            margin="dense"
                                            required
                                            fullWidth
                                            label="Nombre"
                                            name="patient.firstName"
                                            autoFocus
                                            onChange={handleChange}
                                            value={values.patient.firstName}
                                            error={!!(tFirstName && eFirstName)}
                                        />
                                        <ErrorsMessage errors={tFirstName && eFirstName} />
                                    </FormControl>
                                </Grid>
                                <Grid item md={6} sm={12} xs={12}>
                                    <FormControl fullWidth>
                                        <TextField
                                            variant="outlined"
                                            margin="dense"
                                            required
                                            fullWidth
                                            label="Apellido"
                                            name="patient.lastName"
                                            onChange={handleChange}
                                            value={values.patient.lastName}
                                            error={!!(tLastName && eLastName)}
                                        />
                                        <ErrorsMessage errors={tLastName && eLastName}/>
                                    </FormControl>
                                </Grid>
                                <Grid className={classes.unit} item md={6} sm={12} xs={12}>
                                    <Grid item md={6} sm={6} xs={6}>
                                        <FormControl fullWidth>
                                            <TextField
                                                variant="outlined"
                                                margin="dense"
                                                required
                                                fullWidth
                                                label="Edad"
                                                name="patient.age.value"
                                                onChange={handleChange}
                                                value={values.patient.age.value}
                                                error={!!(tAgeValue && eAgeValue)}
                                            />
                                            <ErrorsMessage errors={tAgeValue && eAgeValue}/>
                                        </FormControl>
                                    </Grid>
                                    <Grid className={classes.unitSelect} item md={6} sm={6} xs={6}>
                                        <SelectInput
                                            id={'ageUnit'}
                                            name={'patient.age.unit'}
                                            label={'Unidad'}
                                            itemList={ageUnit}
                                            value={values.patient.age.unit}
                                            errors={!!(tAgeUnit && eAgeUnit)}
                                            required={true}
                                            formikHandleChange={handleChange}
                                        />
                                        <ErrorsMessage errors={tAgeUnit && eAgeUnit}/>
                                    </Grid>
                                </Grid>
                                <Grid item md={6} sm={6} xs={6}>
                                    <FormControl fullWidth>
                                        <TextField
                                            variant="outlined"
                                            margin="dense"
                                            required
                                            fullWidth
                                            label="Peso"
                                            name="patient.weight"
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
                                            }}
                                            onChange={handleChange}
                                            value={values.patient.weight}
                                            error={!!(tWeight && eWeight)}
                                        />
                                        <ErrorsMessage errors={tWeight && eWeight}/>
                                    </FormControl>
                                </Grid>
                                <Grid item md={6} sm={6} xs={6}>
                                    <FormControl fullWidth>
                                        <TextField
                                            variant="outlined"
                                            margin="dense"
                                            required
                                            fullWidth
                                            label="Habitación"
                                            name="patient.room"
                                            onChange={handleChange}
                                            value={values.patient.room}
                                            error={!!(tRoom && eRoom)}
                                        />
                                        <ErrorsMessage errors={tRoom && eRoom}/>
                                    </FormControl>
                                </Grid>
                                <Grid item md={6} sm={6} xs={6}>
                                    <FormControl fullWidth>
                                        <TextField
                                            variant="outlined"
                                            margin="dense"
                                            required
                                            fullWidth
                                            label="Nro de HC"
                                            name="patient.medicalHistoryNumber"
                                            onChange={handleChange}
                                            value={values.patient.medicalHistoryNumber}
                                            error={!!(tMedicalHistoryNumber && eMedicalHistoryNumber)}
                                        />
                                        <ErrorsMessage errors={tMedicalHistoryNumber && eMedicalHistoryNumber}/>
                                    </FormControl>
                                </Grid>
                                <Grid item md={6} sm={12} xs={12}>
                                    <ChipAutocomplete
                                        suggestions={diagnosisList}
                                        label={'Diagnóstico'}
                                        placeHolder={'Escribe una o mas opciones'}
                                        value={values.patient.diagnosis}
                                        name={'patient.diagnosis'}
                                        required={true}
                                        formikSetFieldValue={setFieldValue}
                                        errors={!!(tDiagnosis && eDiagnosis)}
                                    />
                                    <ErrorsMessage errors={tDiagnosis && eDiagnosis}/>
                                </Grid>
                                <Grid item md={6} sm={12} xs={12}>
                                    <ChipAutocomplete
                                        suggestions={surgeryList}
                                        label={'Cirugía'}
                                        placeHolder={'Escribe una o mas opciones'}
                                        value={values.patient.surgery}
                                        name={'patient.surgery'}
                                        required={true}
                                        formikSetFieldValue={setFieldValue}
                                        errors={!!(tSurgery && eSurgery)}
                                    />
                                    <ErrorsMessage errors={tSurgery && eSurgery}/>
                                </Grid>
                                <Grid item md={12} sm={12} xs={12}>
                                    <TextField
                                        variant="outlined"
                                        margin="dense"
                                        fullWidth
                                        multiline
                                        rowsMax="4"
                                        label="Antecedentes Patológicos"
                                        name="patient.pathologicalBackground"
                                        onChange={handleChange}
                                        value={values.patient.pathologicalBackground}
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
                                        onClick={handleReset}
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

export default PatientForm;