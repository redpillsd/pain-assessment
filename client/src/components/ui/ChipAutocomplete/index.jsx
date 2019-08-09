import React from 'react';
import PropTypes from 'prop-types';
import _deburr from 'lodash/deburr';
import Downshift from 'downshift';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';

import styles from './styles';

const renderInput = ({ InputProps, classes, ref, ...other }) => {
    return (
        <TextField
            variant="outlined"
            margin="dense"
            InputProps={{
                inputRef: ref,
                classes: {
                    root: classes.inputRoot,
                    input: classes.inputInput,
                },
                ...InputProps,
            }}
            {...other}
        />
    );
}

const renderSuggestion = ({ suggestion, index, itemProps, highlightedIndex, selectedItem }) => {
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;

    return (
        <MenuItem
            {...itemProps}
            key={suggestion.label}
            selected={isHighlighted}
            component="div"
            style={{
                fontWeight: isSelected ? 500 : 400,
            }}
        >
            {suggestion.label}
        </MenuItem>
    );
}

renderSuggestion.propTypes = {
    highlightedIndex: PropTypes.number,
    index: PropTypes.number,
    itemProps: PropTypes.object,
    selectedItem: PropTypes.string,
    suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
};

const getSuggestions = (suggestions, value, { showEmpty = false } = {}) => {
    const inputValue = _deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0 && !showEmpty
        ? []
        : suggestions.filter(suggestion => {
            const keep =
                count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

            if (keep) {
                count += 1;
            }

            return keep;
        });
}

const ChipAutocomplete = ({ suggestions, name, label, placeHolder, required, formikSetFieldValue, errors, value }) => {
    const classes = styles();

    const [inputValue, setInputValue] = React.useState('');
    const [selectedItem, setSelectedItem] = React.useState([]);

    function handleKeyDown(e) {
        if (selectedItem.length && !inputValue.length && e.key === 'Backspace') {
            setSelectedItem(selectedItem.slice(0, selectedItem.length - 1));
        }
    }

    function handleInputChange(e) {
        setInputValue(e.target.value);
    }

    function handleChange(item) {
        let newSelectedItem = [...selectedItem];
        if (newSelectedItem.indexOf(item) === -1) {
            newSelectedItem = [...newSelectedItem, item];
        }
        setInputValue('');
        setSelectedItem(newSelectedItem);
    }

    const handleDelete = item => () => {
        const newSelectedItem = [...selectedItem];
        newSelectedItem.splice(newSelectedItem.indexOf(item), 1);
        setSelectedItem(newSelectedItem);
        if (newSelectedItem.length === 0){
            formikSetFieldValue(name, [])
        }
    };

    React.useEffect(() => {
        if(selectedItem && selectedItem.length > 0) {
            formikSetFieldValue(name, selectedItem)
        }
    }, [selectedItem]);

    React.useEffect(() => {
        if(value && value.length > 0) {
            setSelectedItem(value)
        }
    }, []);

    return (
        <Downshift
            id="downshift-multiple"
            inputValue={inputValue}
            onChange={handleChange}
            selectedItem={selectedItem}
        >
            {({
                getInputProps,
                getItemProps,
                getLabelProps,
                isOpen,
                inputValue: inputValue2,
                selectedItem: selectedItem2,
                highlightedIndex,
            }) => {
                const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
                    onKeyDown: handleKeyDown,
                    placeholder: placeHolder,
                });

                return (
                    <div className={classes.container}>
                        {renderInput({
                            fullWidth: true,
                            classes,
                            name: name,
                            error: errors,
                            label: `${label} ${required ? '*' : ''}`,
                            InputLabelProps: getLabelProps(),
                            InputProps: {
                                startAdornment: selectedItem.map(item => (
                                    <Chip
                                        key={item}
                                        tabIndex={-1}
                                        label={item}
                                        className={classes.chip}
                                        onDelete={handleDelete(item)}
                                    />
                                )),
                                onBlur,
                                onChange: event => {
                                    handleInputChange(event);
                                    onChange(event);
                                },
                                onFocus,
                            },
                            inputProps,
                        })}

                        {isOpen ? (
                            <Paper className={classes.paper} square>
                                {getSuggestions(suggestions, inputValue2).map((suggestion, index) =>
                                    renderSuggestion({
                                        suggestion,
                                        index,
                                        itemProps: getItemProps({ item: suggestion.label }),
                                        highlightedIndex,
                                        selectedItem: selectedItem2,
                                    }),
                                )}
                            </Paper>
                        ) : null}
                    </div>
                );
            }}
        </Downshift>
    );
}

export default ChipAutocomplete;