import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';

import styles from './styles';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, value, theme) {
    return {
        fontWeight:
            value.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function MultipleSelect({ id, name, label, itemList, required, formikSetFieldValue, errors, selectedValues }) {
    const classes = styles();
    const theme = useTheme();

    const [value, setValue] = React.useState([]);

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);

        if(selectedValues && selectedValues.length > 0) {
            setValue(selectedValues)
        } else {
            setValue([]);
        }
    }, [selectedValues]);

    function handleChange(e) {
        setValue(e.target.value);
        formikSetFieldValue(name, e.target.value)
    }

    return (
        <div className={classes.root}>
            <FormControl variant="outlined" margin="dense" className={classes.formControl}>
                <InputLabel ref={inputLabel} htmlFor={id} error={errors}>{label} {required ? '*' : ''}</InputLabel>
                <Select
                    error={errors}
                    multiple
                    value={value}
                    onChange={handleChange}
                    input={<OutlinedInput variant="outlined" labelWidth={labelWidth} fullWidth={true} margin="dense" id={id} name={name} />}
                    renderValue={selected => (
                        <div className={classes.chips}>
                            {selected.map(value => (
                                <Chip key={value} label={value} className={classes.chip} />
                            ))}
                        </div>
                    )}
                    MenuProps={MenuProps}
                >
                    {itemList.map((item, index) => (
                        <MenuItem key={index} value={item.value} style={getStyles(item.label, value, theme)}>
                            {item.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
