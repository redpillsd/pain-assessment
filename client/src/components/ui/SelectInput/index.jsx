import React from 'react';

import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import _map from 'lodash/map';

import styles from './styles';

const SelectInput = ({ id, name, label, itemList, required, errors, formikHandleChange, selectedValue }) => {
    const classes = styles();

    const [values, setValues] = React.useState({
        [name]: '',
    });

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);

        if (selectedValue) {
            setValues({
                [name]: selectedValue,
            });
        }
    }, []);

    const handleChange = e => {
        setValues(oldValues => ({
            ...oldValues,
            [e.target.name]: e.target.value,
        }));
        formikHandleChange(e);
    }

    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel ref={inputLabel} htmlFor={id} margin="dense" error={errors}>
                {`${label} ${required ? '*' : ''}`}
            </InputLabel>
            <Select
                value={values[name]}
                onChange={handleChange}
                input={<OutlinedInput variant="outlined" labelWidth={labelWidth} fullWidth={true} name={name} id={id} margin="dense" />}
                error={errors}
            >
                <MenuItem value="">
                    <em>Ninguno</em>
                </MenuItem>
                {_map(itemList, (item, index) => {
                    return <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                })}
            </Select>
        </FormControl>
    );
}

export default SelectInput;