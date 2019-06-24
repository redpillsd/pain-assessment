import React, { useState } from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';

/* import './App.css'; */

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        console.log(formData);
    };

    return(
        <Grid textAlign='center' style={{ height: '100vh', marginLeft: 0 }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
                Log-in to your account
            </Header>
            <Form size='large' onSubmit={e => onSubmit(e)}>
                <Segment>
                <Form.Input name='email' value={email} onChange={e => onChange(e)} fluid icon='mail' iconPosition='left' placeholder='Email' />
                <Form.Input
                    name='password' value={password} onChange={e => onChange(e)}
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                />

                <Button color='teal' fluid size='large'>
                    Login
                </Button>
                </Segment>
            </Form>
            <Message>
                Eres Nuevo?  <a href='/register'>Registrate</a>
            </Message>
            </Grid.Column>
        </Grid>
    );
}

export default Login;
