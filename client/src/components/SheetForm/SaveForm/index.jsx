import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { Formik } from 'formik';
import * as Yup from 'yup';

import ErrorsMessage from '../../ui/ErrorsMessage';
import styles from './styles';

const SaveForm = ({ goToStep, patient, lock, infusionPump }) => {
    const classes = styles();

    return (
        <Formik
            onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true);
                    const sheet = {
                        patient,
                        lock,
                        infusionPump
                    };
                    console.log('@@@ Sheet values ->',sheet);
                    // setPatient(values)
                    // nextStep();
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
                            Ficha
                        </Typography>
                        <div>
                            <pre>{JSON.stringify(patient, null, 2)}</pre>
                        </div>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                            onClick={() => goToStep(1)}
                        >
                            Editar Paciente
                        </Button>
                        <div>
                            <pre>{JSON.stringify(lock, null, 2)}</pre>
                        </div>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                            onClick={() => goToStep(2)}
                        >
                            Editar Bloqueo
                        </Button>
                        <div>
                            <pre>{JSON.stringify(infusionPump, null, 2)}</pre>
                        </div>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                            onClick={() => goToStep(3)}
                        >
                            Editar Bomba
                        </Button>
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
                    </div>
                );
            }}
        </Formik>
    );
}

export default SaveForm;