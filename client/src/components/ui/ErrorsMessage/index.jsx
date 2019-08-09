import React from 'react';
import FormHelperText from '@material-ui/core/FormHelperText';

import styles from './styles';

const ErrorsMessage = ({ errors }) => {
    const classes = styles();

    if (errors) {
        return(
            <FormHelperText error={!!errors} id="error-message" className={classes.text}>
                {errors}
            </FormHelperText>
        );
    }

    return null;
}

export default ErrorsMessage;