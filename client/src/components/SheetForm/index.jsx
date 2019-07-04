import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container, InputAdornment } from '@material-ui/core'

import styles from './styles';

import PatientForm from './PatientForm';
import LockForm from './LockForm';
import InfusionPumpForm from './InfusionPumpForm';

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

const defaultData = {
    step: 3,
    firstName: '',
    lastName: '',
    age: '',
    weight: 87,
    room: '',
    medicalHistoryNumber: '',
    diagnosis: '',
    surgery: '',
    pathologicalBackground: ''
};

const Sheet = () => {
    const classes = styles();
    const [formData, setFormData] = useState(defaultData);

    // Go to the next step
    const nextStep = () => {
        const { step } = formData;
        setFormData({
            step: step + 1
        });
    }

    // Go to the previous step
    const prevStep = () => {
        const { step } = formData;
        setFormData({
            step: step - 1
        });
    }

    // Handle fields change
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        console.log(formData);
    };

    const renderSteps = () => {
        const { step } = formData;
        const { firstName, lastName, age, weight, room, medicalHistoryNumber, diagnosis, surgery, pathologicalBackground } = formData;
        const patientForm = { firstName, lastName, age, weight, room, medicalHistoryNumber, diagnosis, surgery, pathologicalBackground };

        switch (step) {
            case 1:
                return (
                    <PatientForm
                        nextStep={() => nextStep()}
                        onChange={e => onChange(e)}
                        values={patientForm}
                    />
                );
            case 2:
                return (
                    <LockForm
                        nextStep={() => nextStep()}
                        prevStep={() => prevStep()}
                        onChange={e => onChange(e)}
                        values={patientForm}
                    />
                );
            case 3:
                return (
                    <InfusionPumpForm
                        nextStep={() => nextStep()}
                        prevStep={() => prevStep()}
                        onChange={e => onChange(e)}
                        values={patientForm}
                    />
                );
            case 4:
                return (
                    <h1>Success</h1>
                );
            default:
                return null;
        }
    }

    return (
        <Container component="main" maxWidth="xl">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Creación de Ficha
                </Typography>
                {renderSteps()}
            </div>
        </Container>
    );
}

export default Sheet;