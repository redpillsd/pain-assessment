import React, { useState } from 'react';
import { Typography, Container } from '@material-ui/core'

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

const initialPatient = {
    patient: {
        firstName: '',
        lastName: '',
        age: {
            value: '',
            unit: '',
        },
        weight: '',
        room: '',
        medicalHistoryNumber: '',
        diagnosis: [],
        surgery: [],
        pathologicalBackground: '',
    }
};

const initialLock = {
    lock: {
        /* type: '',
        totalVolume: '',
        drugs: [], */
    }
}

const initialInfusionPump = {
    infusionPump: {
        /* totalVolume: 0,
        infusionRate: 0,
        drugs: [], */
    },
}

const Sheet = () => {
    const classes = styles();

    const [step, setStep] = useState(1);

    const [useLock, setUseLock] = useState(false);
    const [useLockClass, setUseLockClass] = useState(classes.show);
    const [useInfusionPump, setUseInfusionPump] = useState(false);
    const [useInfusionPumpClass, setUseInfusionPumpClass] = useState(classes.hide);

    const [patient, setPatient] = useState(initialPatient);
    const [lock, setLock] = useState(initialLock);
    const [infusionPump, setInfusionPump] = useState(initialInfusionPump);

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
                        weight={patient.weight}
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