import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import Container from '@material-ui/core/Container';

import _map from 'lodash/map';
import { Formik } from 'formik';
import * as Yup from 'yup';
import SelectInput from '../ui/SelectInput';
import Slider from './Slider';
import ChipSelectMultiple from '../ui/ChipSelectMultiple';
import ErrorsMessage from '../ui/ErrorsMessage';
import styles from './styles';

import infusionPumpDrugsList from '../../mockData/infusionPumpDrugsList';

const EvaluationForm = () => {
    const classes = styles();

    const [rescueData, setRescueData] = useState([]);

    useEffect(() =>{
        setRescueData(parseData(infusionPumpDrugsList));
    }, []);

    const shift = [
        { value: 'Mañana', label: 'Mañana' },
        { value: 'Tarde', label: 'Tarde' },
    ];

    const scale = [
        { value: 'EVN', label: 'EVN (Subjetiva)' },
        { value: 'LLANTO', label: 'LLANTO (Objetiva)' },
    ];

    const painLevel = [
        { value: 1, label: '1' },
        { value: 2, label: '2' },
        { value: 3, label: '3' },
        { value: 4, label: '4' },
        { value: 5, label: '5' },
        { value: 6, label: '6' },
        { value: 7, label: '7' },
        { value: 8, label: '8' },
        { value: 9, label: '9' },
        { value: 10, label: '10' },
    ];
    
    const parseData = (list) => {
        let array = [];
        _map(list, i => {
            let label = `${i.label} ${i.value} mg`,
                value = label;
                array.push({ label, value })
        })

        return array;
    }

    return (
        <Formik
            initialValues={{
                infusionRate: '',
                shift: '',
                scale: '',
                painLevel: 0,
                rescue: []
            }}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                /* axios.post(contactFormEndpoint,
                values,
                {
                    headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    }
                },
                ).then((resp) => {
                setSubmitionCompleted(true);
                }
                ); */
                console.log(values);
            }}

            validationSchema={Yup.object().shape({
                infusionRate: Yup.string()
                    .required('Este campo es requerido')
                    .matches(/^[0-9]*$/, 'Este campo debe ser numérico'),
                shift: Yup.string()
                    .required('Este campo es requerido'),
                scale: Yup.string()
                    .required('Este campo es requerido'),
                painLevel: Yup.number()
                    .min(1, 'Seleccione un valor del 1 al 10')
                    .max(10, 'Seleccione un valor del 1 al 10'),
                rescue : Yup.array()
                    .min(1, 'Elige por lo menos una de las opciones')
                    .of(
                        Yup.string().required(),
                    ),
            })}
        >
            {(props) => {
                const {
                    values,
                    touched,
                    errors,
                    handleChange,
                    setFieldValue,
                    handleSubmit,
                } = props;
                return (
                    <Container fixed component="main" maxWidth="xl">
                        <div className={classes.paper}>
                            <Typography component="h1" variant="h6">
                                Evaluación
                            </Typography>
                            <div>
                                <pre>{JSON.stringify(props, null, 2)}</pre>
                            </div>
                            <form className={classes.form} noValidate>
                                <Grid container spacing={2}>
                                    <Grid item md={12} sm={12} xs={12}>Evaluador: Pepe Hongo</Grid>
                                    <Grid item md={12} sm={12} xs={12}>12/07/2019 - 18:45hs</Grid>
                                    <Grid item md={12} sm={12} xs={12}>
                                        <FormControl fullWidth>
                                            <TextField
                                                autoFocus
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
                                                value={values.infusionRate}
                                                error={!!(touched.infusionRate && errors.infusionRate)}
                                            />
                                            <ErrorsMessage errors={touched.infusionRate && errors.infusionRate} />
                                        </FormControl>
                                    </Grid>
                                    <Grid item md={12} sm={12} xs={12}>
                                        <FormControl fullWidth>
                                            <SelectInput
                                                id={'shift'}
                                                name={'shift'}
                                                label={'Turno'}
                                                itemList={shift}
                                                value={values.shift}
                                                selectedValue={values.shift}
                                                required={true}
                                                formikHandleChange={handleChange}
                                                errors={!!(touched.shift && errors.shift)}
                                            />
                                            <ErrorsMessage errors={touched.shift && errors.shift}/>
                                        </FormControl>
                                    </Grid>
                                    <Grid item md={12} sm={12} xs={12}>
                                        <Box border={1} borderColor={'rgba(0, 0, 0, 0.23)'} borderRadius={5}>
                                            <div className={classes.paper}>
                                                <Grid className={classes.painLevel} item md={12} sm={12} xs={12}>
                                                    
                                                        <SelectInput
                                                            id={'scale'}
                                                            name={'scale'}
                                                            label={'Escala'}
                                                            itemList={scale}
                                                            value={values.scale}
                                                            selectedValue={values.scale}
                                                            required={true}
                                                            formikHandleChange={handleChange}
                                                            errors={!!(touched.scale && errors.scale)}
                                                        />
                                                        <ErrorsMessage errors={touched.scale && errors.scale}/>
                                                    
                                                </Grid>
                                                <Grid className={classes.painLevel} item md={12} sm={12} xs={12}>
                                                    <SelectInput
                                                        id={'painLevel'}
                                                        name={'painLevel'}
                                                        label={'Nivel de Dolor'}
                                                        itemList={painLevel}
                                                        value={values.painLevel && values.painLevel}
                                                        selectedValue={values.painLevel && values.painLevel}
                                                        required={true}
                                                        formikHandleChange={handleChange}
                                                        errors={!!((touched.painLevel && touched.painLevel) && ( errors.painLevel && errors.painLevel))}
                                                    />
                                                    <ErrorsMessage errors={(touched.painLevel && touched.painLevel) && ( errors.painLevel && errors.painLevel)}/>
                                                </Grid>
                                            </div>
                                        </Box>
                                    </Grid>
                                    <Grid item md={12} sm={12} xs={12}>
                                        <ChipSelectMultiple 
                                            name={'rescue'}
                                            label={'Rescate'}
                                            itemList={rescueData}
                                            value={values.rescue}
                                            selectedValues={values.rescue}
                                            required={true}
                                            formikSetFieldValue={setFieldValue}
                                            errors={!!(touched.rescue && errors.rescue)}
                                        />
                                        <ErrorsMessage errors={touched.rescue && errors.rescue}/>
                                    </Grid>
                                    <Grid item md={12} sm={12} xs={12}>
                                        <FormControl fullWidth>
                                            <TextField
                                                variant="outlined"
                                                margin="dense"
                                                fullWidth
                                                label="Efectos Adversos"
                                                name="adverseEffects"
                                                onChange={handleChange}
                                                value={values.adverseEffects || ''}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item md={12} sm={12} xs={12}>
                                        <FormControlLabel
                                            checked={values.roomChange || false}
                                            className={classes.checkbox}
                                            control={<Checkbox color="primary" />}
                                            label="Cambio de Habitación"
                                            name="roomChange"
                                            labelPlacement="start"
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item md={12} sm={12} xs={12}>
                                        <FormControl fullWidth>
                                            <TextField
                                                variant="outlined"
                                                margin="dense"
                                                fullWidth
                                                label="Nota"
                                                name="note"
                                                onChange={handleChange}
                                                value={values.note || ''}
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item md={6} sm={6} xs={6}>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            color="secondary"
                                            className={classes.submit}
                                            component={Link}
                                            href="/dashboard"
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
                                            Guardar
                                        </Button>
                                    </Grid>
                                </Grid>
                                <pre>{JSON.stringify(values, null, 2)}</pre>
                            </form>
                        </div>
                    </Container>
                );
            }}
        </Formik>
    );
}

export default EvaluationForm;