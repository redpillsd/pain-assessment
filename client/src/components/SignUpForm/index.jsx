import React from 'react';
import { Avatar, Button, TextField, FormControl, Link, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import styles from './styles';

import useForm from '../utils/useForm';
import validate from './formValidationRules';
import ErrorsMessage from '../ui/ErrorsMessage';

const SignUp = () => {
    const classes = styles();

    const signUp = () => {
        console.log(values);
    };

    const { values, handleChange, handleSubmit, errors } = useForm(signUp, validate);

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
                                    id="firstName"
                                    label="Nombre"
                                    autoFocus
                                    onChange={handleChange}
                                    value={values.firstName || ''}
                                    error={!!errors.firstName}
                                />
                                <ErrorsMessage errors={errors.firstName}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Apellido"
                                    name="lastName"
                                    onChange={handleChange}
                                    value={values.lastName || ''}
                                    error={!!errors.lastName}
                                />
                                <ErrorsMessage errors={errors.lastName}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    onChange={handleChange}
                                    value={values.email || ''}
                                    error={!!errors.email}
                                />
                                <ErrorsMessage errors={errors.email}/>
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
                                    id="password" 
                                    onChange={handleChange}
                                    value={values.password || ''}
                                    error={!!errors.password}
                                />
                                <ErrorsMessage errors={errors.password}/>
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
                                    id="passwordConfirmation" 
                                    onChange={handleChange}
                                    value={values.passwordConfirmation || ''}
                                    error={!!errors.passwordConfirmation}
                                />
                                <ErrorsMessage errors={errors.passwordConfirmation}/>
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
}

export default SignUp;