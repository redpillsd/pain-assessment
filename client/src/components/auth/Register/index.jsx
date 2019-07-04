// import React, { useState } from 'react';
// import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';

// const Register = () => {
//     const [formData, setFormData] = useState({
//         firstName: '',
//         lastName: '',
//         email: '',
//         password: '',
//         passwordConfirmation: ''
//     });

//     const { firstName, lastName, email, password, passwordConfirmation } = formData;

//     const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

//     const onSubmit = e => {
//         e.preventDefault();
//         if (password !== passwordConfirmation) {
//             console.log('passwords should match');
//         } else {
//             console.log(formData);
//         }
//     };

//     return(
//         <Grid textAlign='center' style={{ height: '100vh', marginLeft: 0 }} verticalAlign='middle'>
//             <Grid.Column style={{ maxWidth: 450 }}>
//             <Header as='h2' color='teal' textAlign='center'>
//                 Registrar una nueva cuenta
//             </Header>
//             <Form size='large' onSubmit={e => onSubmit(e)}>
//                 <Segment>
//                 <Form.Input name='firstName' value={firstName} onChange={e => onChange(e)} fluid icon='user' iconPosition='left' placeholder='Nombre' />
//                 <Form.Input name='lastName' value={lastName} onChange={e => onChange(e)} fluid icon='user' iconPosition='left' placeholder='Apellido' />
//                 <Form.Input name='email' value={email} onChange={e => onChange(e)} fluid icon='mail' iconPosition='left' placeholder='Email' />
//                 <Form.Input
//                     name='password'
//                     value={password}
//                     onChange={e => onChange(e)}
//                     fluid
//                     icon='lock'
//                     iconPosition='left'
//                     placeholder='Password'
//                     type='password'
//                 />
//                 <Form.Input
//                     name='passwordConfirmation'
//                     value={passwordConfirmation}
//                     onChange={e => onChange(e)}
//                     fluid
//                     icon='lock'
//                     iconPosition='left'
//                     placeholder='Confirm Password'
//                     type='password'
//                 />

//                 <Button color='teal' fluid size='large'>
//                     Registrarse
//                 </Button>
//                 </Segment>
//             </Form>
//             </Grid.Column>
//         </Grid>
//     );
// }

// export default Register;

import React from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';

// function MadeWithLove() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Built with love by the '}
//       <Link color="inherit" href="https://material-ui.com/">
//         Material-UI
//       </Link>
//       {' team.'}
//     </Typography>
//   );
// }

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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
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
              <TextField
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Nombre"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Apellido"
                name="lastName"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
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
      {/* <Box mt={5}>
        <MadeWithLove />
      </Box> */}
    </Container>
  );
}