import React from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const Sheet = () => {
  const classes = useStyles();

/*  
    The breakpoint **start** at this value.
    For instance with the first breakpoint xs: [xs, sm[.
    const values = {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
    }; 
*/

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <div className={classes.paper}>
        {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar> */}
        <Typography component="h1" variant="h5">
          Creacion de Ficha
        </Typography>
        <form className={classes.form} noValidate>
        <Grid container spacing={2}>
            <Grid item md={6} sm={12} xs={12}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="firstName"
                    label="Nombre"
                    name="firstName"
                    autoComplete="firstName"
                    autoFocus
                />
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="lastName"
                    label="Apellido"
                    name="lastName"
                    autoComplete="lastName"
                    autoFocus
                />
            </Grid>
            <Grid item md={6} sm={6} xs={6}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="age"
                    label="Edad"
                    name="age"
                    autoComplete="age"
                    autoFocus
                />
            </Grid>
            <Grid item md={6} sm={6} xs={6}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="weight"
                    label="Peso"
                    name="weight"
                    autoComplete="weight"
                    autoFocus
                />
            </Grid>
            <Grid item md={6} sm={6} xs={6}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="room"
                    label="Habitación"
                    name="room"
                    autoComplete="room"
                    autoFocus
                />
            </Grid>
            <Grid item md={6} sm={6} xs={6}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="medicalHistoryNumber"
                    label="Nro de HC"
                    name="medicalHistoryNumber"
                    autoComplete="medicalHistoryNumber"
                    autoFocus
                />
            </Grid>
            <Grid item md={12} sm={12} xs={12}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="diagnosisSurgery"
                    label="Diagnóstico-Cirugía"
                    name="diagnosisSurgery"
                    autoComplete="diagnosisSurgery"
                    autoFocus
                />
            </Grid>
            <Grid item md={12} sm={12} xs={12}>
                {/* TODO opcional add a radio button */}
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    multiline
                    rowsMax="4"
                    id="pathologicalBackground"
                    label="Antecedentes Patológicos"
                    name="pathologicalBackground"
                    autoComplete="pathologicalBackground"
                    autoFocus
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
          >
            Guardar
          </Button>
          
          </Grid>
          </Grid>
        </form>
      </div>
      {/* <Box mt={5}>
        <MadeWithLove />
      </Box> */}
    </Container>
  );
}

export default Sheet;