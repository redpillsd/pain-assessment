import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import _map from 'lodash/map';

const useStyles = makeStyles(theme => ({
    formControl: {
        width: '100%',
        marginTop: theme.spacing(0.5),
    },
}));

const SelectInput = (props) => {
    const classes = useStyles();

    const { id, name, label, itemList } = props;

    const [values, setValues] = React.useState({
        [name]: '',
    });

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const handleChange = event => {
        setValues(oldValues => ({
            ...oldValues,
            [event.target.name]: event.target.value,
        }));
    }

    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel ref={inputLabel} htmlFor={id} margin="dense">
                {label}
            </InputLabel>
            <Select
                value={values[name]}
                onChange={handleChange}
                input={<OutlinedInput variant="outlined" labelWidth={labelWidth} fullWidth={true} name={name} id={id} margin="dense" />}
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