import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

import PatientForm from './PatientForm';
import LockForm from './LockForm';
import InfusionPumpForm from './InfusionPumpForm';
import styles from './styles';

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

const initialPatient = {
    firstName: 'asdasd',
    lastName: 'sdasda',
    age: {
        value: '12',
        unit: 'Meses',
    },
    weight: '35',
    room: '12',
    medicalHistoryNumber: '12345',
    diagnosis: [
        "MAR"
    ],
    surgery: [
        "Colocación de placa en 8"
    ],
    pathologicalBackground: 'asdasdasd',
};

const Sheet = () => {
    const classes = styles();

    const [step, setStep] = useState(3);

    const [useLock, setUseLock] = useState(false);
    const [useLockClass, setUseLockClass] = useState(classes.hide);

    const [useInfusionPump, setUseInfusionPump] = useState(false);
    const [useInfusionPumpClass, setUseInfusionPumpClass] = useState(classes.hide);

    const [patient, setPatient] = useState(initialPatient);
    const [lock, setLock] = useState({});
    const [infusionPump, setInfusionPump] = useState({});

    const handleCheckboxI = e => {
        setUseInfusionPump(e.target.checked);
        useInfusionPump ? setUseInfusionPumpClass(classes.hide) : setUseInfusionPumpClass(classes.show);
    };

    const handleCheckboxL = e => {
        setUseLock(e.target.checked);
        if (useLock) {
            setUseLockClass(classes.hide);
        } else {
            setUseLockClass(classes.show);
        }
    };

    // Go to the next step
    const nextStep = () => {
        setStep(step + 1);
    };

    // Go to the previous step
    const prevStep = () => {
        setStep(step - 1);
    };

    const renderSteps = () => {
        switch (step) {
            case 1:
                return (
                    <PatientForm
                        nextStep={() => nextStep()}
                        patient={patient}
                        setPatient={patient => setPatient(patient)}
                    />
                );
            case 2:
                return (
                    <LockForm
                        nextStep={() => nextStep()}
                        prevStep={() => prevStep()}
                        handleCheckbox={e => handleCheckboxL(e)}
                        lock={lock}
                        setLock={lock => setLock(lock)}
                        useLock={useLock}
                        useLockClass={useLockClass}
                    />
                );
            case 3:
                return (
                    <InfusionPumpForm
                        nextStep={() => nextStep()}
                        prevStep={() => prevStep()}
                        handleCheckbox={e => handleCheckboxI(e)}
                        infusionPump={infusionPump}
                        setInfusionPump={infusionPump => setInfusionPump(infusionPump)}
                        useInfusionPump={useInfusionPump}
                        useInfusionPumpClass={useInfusionPumpClass}
                        patient={patient}
                    />
                );
            case 4:
                return (
                    <h1>Success</h1>
                );
            default:
                return null;
        };
    };

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