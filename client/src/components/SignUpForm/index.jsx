import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { Formik } from 'formik';
import * as Yup from 'yup';
import ErrorsMessage from '../ui/ErrorsMessage';
import styles from './styles';

const SignUp = () => {
    const classes = styles();

    return (
        <Formik
            initialValues={{ 
                firstName: '', 
                lastName: '', 
                email: '', 
                password: '',
                passwordConfirmation: '' 
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
                firstName: Yup.string()
                    .required('Este campo es requerido'),
                lastName: Yup.string()
                    .required('Este campo es requerido'),
                email: Yup.string()
                    .email('Este campo es inválido')
                    .required('Este campo es requerido'),
                password: Yup.string()
                    .required('Este campo es requerido')
                    .min(5, 'Este campo debe contener 5 o más caracteres'),
                passwordConfirmation: Yup.string()
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
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Registrarse
                            </Typography>
                            <form className={classes.form} noValidate>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <TextField
                                                name="firstName"
                                                variant="outlined"
                                                required
                                                fullWidth
                                                label="Nombre"
                                                autoFocus
                                                onChange={handleChange}
                                                value={values.firstName}
                                                error={!!(touched.firstName && errors.firstName)}
                                            />
                                            <ErrorsMessage errors={touched.firstName && errors.firstName}/>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <TextField
                                                variant="outlined"
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
                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                label="Email"
                                                name="email"
                                                onChange={handleChange}
                                                value={values.email}
                                                error={!!(touched.email && errors.email)}
                                            />
                                            <ErrorsMessage errors={touched.email && errors.email}/>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                name="password"
                                                label="Password"
                                                type="password"
                                                onChange={handleChange}
                                                value={values.password || ''}
                                                error={!!(touched.password && errors.password)}
                                            />
                                            <ErrorsMessage errors={touched.password && errors.password}/>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                name="passwordConfirmation"
                                                label="Confirmación de Password"
                                                type="password"
                                                onChange={handleChange}
                                                value={values.passwordConfirmation || ''}
                                                error={!!(touched.passwordConfirmation && errors.passwordConfirmation)}
                                            />
                                            <ErrorsMessage errors={touched.passwordConfirmation && errors.passwordConfirmation}/>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={handleSubmit}
                                >
                                    Registrarse
                                </Button>
                                <Grid container justify="center">
                                    <Grid item>
                                        <Link href="/" variant="body2">
                                            ¿Ya tienes una cuenta? Inicia Sesión
                                        </Link>
                                    </Grid>
                                </Grid>
                            </form>
                        </div>
                    </Container>
                );
            }}
        </Formik>
    );
}

export default SignUp;