// import React, { useState } from 'react';
// import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';

// /* import './App.css'; */

// const Login = () => {
//     const [formData, setFormData] = useState({
//         email: '',
//         password: ''
//     });

//     const { email, password } = formData;

//     const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

//     const onSubmit = e => {
//         e.preventDefault();
//         console.log(formData);
//     };

//     return(
//         <Grid textAlign='center' style={{ height: '100vh', marginLeft: 0 }} verticalAlign='middle'>
//             <Grid.Column style={{ maxWidth: 450 }}>
//             <Header as='h2' color='teal' textAlign='center'>
//                 Log-in to your account
//             </Header>
//             <Form size='large' onSubmit={e => onSubmit(e)}>
//                 <Segment>
//                 <Form.Input name='email' value={email} onChange={e => onChange(e)} fluid icon='mail' iconPosition='left' placeholder='Email' />
//                 <Form.Input
//                     name='password' value={password} onChange={e => onChange(e)}
//                     fluid
//                     icon='lock'
//                     iconPosition='left'
//                     placeholder='Password'
//                     type='password'
//                 />

//                 <Button color='teal' fluid size='large'>
//                     Login
//                 </Button>
//                 </Segment>
//             </Form>
//             <Message>
//                 Eres Nuevo?  <a href='/register'>Registrate</a>
//             </Message>
//             </Grid.Column>
//         </Grid>
//     );
// }

// export default Login;

import React from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container } from '@material-ui/core'
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const classes = useStyles();

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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Iniciar Sesión
          </Button>
          <Grid container justify="center">
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
              <Link href="/register" variant="body2">
                {"¿No tienes una cuenta? Registrate"}
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

export default Login;