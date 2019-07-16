import React from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControl, Link, Grid, Typography, Container } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import styles from './styles';

import { Formik } from 'formik';
import * as Yup from 'yup';

import ErrorsMessage from '../ui/ErrorsMessage';

const Login = () => {
    const classes = styles();

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
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
                email: Yup.string()
                    .email('Este campo es inválido')
                    .required('Este campo es requerido'),
                password: Yup.string()
                    .required('Este campo es requerido')
                    .min(5, 'Este campo debe contener 5 o más caracteres'),
            })}
        >
            {(props) => {
                const {
                    values,
                    touched,
                    errors,
                    handleChange,
                    handleSubmit,
                } = props;
                return (
                    <Container component="main" maxWidth="xs">
                        <div>
                            <pre>{JSON.stringify(props, null, 2)}</pre>
                        </div>
                        <CssBaseline />
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Iniciar Sesión
                            </Typography>
                            <form className={classes.form} noValidate>
                                <FormControl fullWidth>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Email"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                        onChange={handleChange}
                                        value={values.email}
                                        error={!!((errors.email && touched.email) && errors.email)}
                                    />
                                    <ErrorsMessage errors={(errors.email && touched.email) && errors.email} />
                                </FormControl>
                                <FormControl fullWidth>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        onChange={handleChange}
                                        value={values.password}
                                        error={!!((errors.password && touched.password) && errors.password)}
                                    />
                                    <ErrorsMessage errors={(errors.password && touched.password) && errors.password} />
                                </FormControl>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={handleSubmit}
                                >
                                    Iniciar Sesión
                                </Button>
                                <Grid container justify="center">
                                    <Grid item>
                                        <Link href="/sign-up" variant="body2">
                                            ¿No tienes una cuenta? Registrate
                                        </Link>
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

export default Login;