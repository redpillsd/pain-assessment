import React from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControl, Link, Grid, Typography, Container } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import styles from './styles';

import useForm from '../utils/useForm';
import validate from '../utils/formValidationRules';
import ErrorsMessage from '../ui/ErrorsMessage';

const Login = () => {
    const classes = styles();

    const login = () => {
        console.log(values);
    };

    const { values, handleChange, handleSubmit, errors } = useForm(login, validate);

    return (
        <Container component="main" maxWidth="xs">
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
                            error={!!errors.email}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={handleChange}
                            value={values.email || ''}
                        />
                        <ErrorsMessage errors={errors.email}/>
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            error={!!errors.password}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onChange={handleChange}
                            value={values.password || ''}
                        />
                        <ErrorsMessage errors={errors.password}/>
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
                            <Link href="/register" variant="body2">
                                ¿No tienes una cuenta? Registrate
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

export default Login;