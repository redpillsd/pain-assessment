import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Formik } from 'formik';
import * as Yup from 'yup';

import ChipAutocomplete from '../../ui/ChipAutocomplete';
import SelectInput from '../../ui/SelectInput';
import ErrorsMessage from '../../ui/ErrorsMessage';
import styles from './styles';

import diagnosisList from '../../../mockData/diagnosisList';
import surgeryList from '../../../mockData/surgeryList';

const PatientForm = ({ patient, setPatient, nextStep }) => {
    const classes = styles();

    const validationSchema = Yup.object({
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
                    
                return (
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h6">
                            Paciente
                        </Typography>
                        <div>
                            <pre>{JSON.stringify(props, null, 2)}</pre>
                        </div>
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
                                            name="firstName"
                                            autoFocus
                                            onChange={handleChange}
                                            value={values.firstName}
                                            error={!!(touched.firstName && errors.firstName)}
                                        />
                                        <ErrorsMessage errors={touched.firstName && errors.firstName} />
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
                                            name="lastName"
                                            onChange={handleChange}
                                            value={values.lastName}
                                            error={!!(touched.lastName && errors.lastName)}
                                        />
                                        <ErrorsMessage errors={touched.lastName && errors.lastName}/>
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
                                                name="age.value"
                                                onChange={handleChange}
                                                value={values.age && values.age.value}
                                                error={!!((touched.age && touched.age.value) && ( errors.age && errors.age.value))}
                                            />
                                            <ErrorsMessage errors={(touched.age && touched.age.value) && ( errors.age && errors.age.value)}/>
                                        </FormControl>
                                    </Grid>
                                    <Grid className={classes.unitSelect} item md={6} sm={6} xs={6}>
                                        <SelectInput
                                            id={'ageUnit'}
                                            name={'age.unit'}
                                            label={'Unidad'}
                                            itemList={ageUnit}
                                            value={values.age && values.age.unit}
                                            selectedValue={values.age && values.age.unit}
                                            required={true}
                                            formikHandleChange={handleChange}
                                            errors={!!((touched.age && touched.age.unit) && ( errors.age && errors.age.unit))}
                                        />
                                        <ErrorsMessage errors={(touched.age && touched.age.unit) && ( errors.age && errors.age.unit)}/>
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
                                            name="weight"
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
                                            }}
                                            onChange={handleChange}
                                            value={values.weight}
                                            error={!!(touched.weight && errors.weight)}
                                        />
                                        <ErrorsMessage errors={touched.weight && errors.weight}/>
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
                                            name="room"
                                            onChange={handleChange}
                                            value={values.room}
                                            error={!!(touched.room && errors.room)}
                                        />
                                        <ErrorsMessage errors={touched.room && errors.room}/>
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
                                            name="medicalHistoryNumber"
                                            onChange={handleChange}
                                            value={values.medicalHistoryNumber}
                                            error={!!(touched.medicalHistoryNumber && errors.medicalHistoryNumber)}
                                        />
                                        <ErrorsMessage errors={touched.medicalHistoryNumber && errors.medicalHistoryNumber}/>
                                    </FormControl>
                                </Grid>
                                <Grid item md={6} sm={12} xs={12}>
                                    <ChipAutocomplete
                                        suggestions={diagnosisList}
                                        label={'Diagnóstico'}
                                        placeHolder={'Escribe una o mas opciones'}
                                        value={values.diagnosis}
                                        name={'diagnosis'}
                                        required={true}
                                        formikSetFieldValue={setFieldValue}
                                        errors={!!(touched.diagnosis && errors.diagnosis)}
                                    />
                                    <ErrorsMessage errors={touched.diagnosis && errors.diagnosis}/>
                                </Grid>
                                <Grid item md={6} sm={12} xs={12}>
                                    <ChipAutocomplete
                                        suggestions={surgeryList}
                                        label={'Cirugía'}
                                        placeHolder={'Escribe una o mas opciones'}
                                        value={values.surgery}
                                        name={'surgery'}
                                        required={true}
                                        formikSetFieldValue={setFieldValue}
                                        errors={!!(touched.surgery && errors.surgery)}
                                    />
                                    <ErrorsMessage errors={touched.surgery && errors.surgery}/>
                                </Grid>
                                <Grid item md={12} sm={12} xs={12}>
                                    <TextField
                                        variant="outlined"
                                        margin="dense"
                                        fullWidth
                                        multiline
                                        rowsMax="4"
                                        label="Antecedentes Patológicos"
                                        name="pathologicalBackground"
                                        onChange={handleChange}
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