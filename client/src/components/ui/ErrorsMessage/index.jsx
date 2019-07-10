import React from 'react';
import { FormHelperText } from '@material-ui/core';

import styles from './styles'

const ErrorsMessage = ({errors}) => {
    const classes = styles();

    if (errors) {
        return(
            <FormHelperText error={!!errors} id="error-message" className={classes.text}>
                {errors}
            </FormHelperText>
        );
    } else {
        return null;
    };
}

export default ErrorsMessage;