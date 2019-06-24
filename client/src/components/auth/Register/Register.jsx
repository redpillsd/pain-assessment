import React, { useState } from 'react';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    });

    const { firstName, lastName, email, password, passwordConfirmation } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if (password !== passwordConfirmation) {
            console.log('passwords should match');
        } else {
            console.log(formData);
        }
    };

    return(
        <Grid textAlign='center' style={{ height: '100vh', marginLeft: 0 }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
                Registrar una nueva cuenta
            </Header>
            <Form size='large' onSubmit={e => onSubmit(e)}>
                <Segment>
                <Form.Input name='firstName' value={firstName} onChange={e => onChange(e)} fluid icon='user' iconPosition='left' placeholder='Nombre' />
                <Form.Input name='lastName' value={lastName} onChange={e => onChange(e)} fluid icon='user' iconPosition='left' placeholder='Apellido' />
                <Form.Input name='email' value={email} onChange={e => onChange(e)} fluid icon='mail' iconPosition='left' placeholder='Email' />
                <Form.Input
                    name='password'
                    value={password}
                    onChange={e => onChange(e)}
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                />
                <Form.Input
                    name='passwordConfirmation'
                    value={passwordConfirmation}
                    onChange={e => onChange(e)}
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Confirm Password'
                    type='password'
                />

                <Button color='teal' fluid size='large'>
                    Registrarse
                </Button>
                </Segment>
            </Form>
            </Grid.Column>
        </Grid>
    );
}

export default Register;
