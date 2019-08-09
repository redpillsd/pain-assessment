import React, { Fragment, useState } from 'react';
import { TextField, FormControl, Grid, Fab, InputAdornment, Box } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import { FieldArray } from 'formik';
import SelectInput from '../../ui/SelectInput';
import ErrorsMessage from '../../ui/ErrorsMessage';
import DrugList from './DrugList'
import styles from './styles';

import lockDrugsList from '../../../mockData/lockDrugsList';

const DrugForm = ({ formikProps }) => {
    const classes = styles();

    const {
        values,
        touched,
        errors,
        handleChange,
        setFieldValue,
        handleSubmit,
    } = formikProps;

    return (
        <Box border={1} borderColor={'rgba(0, 0, 0, 0.23)'} borderRadius={5}>
            <FieldArray name="drugs">
                {({push, remove}) => (
                    <Fragment>
                        {values.drugs && values.drugs.length > 0 && values.drugs.map((drug, index) => (
                        <div className={classes.paper} key={index}>
                            <div>{index}</div>
                            <div>{values.drugs[index].name}</div>
                            <Grid item md={12} sm={12} xs={12}>
                                <SelectInput
                                    id={values.drugs[index].name}
                                    name={`drugs[${index}].name`}
                                    label={'Droga'}
                                    itemList={lockDrugsList}
                                    value={values.drugs[index].name}
                                    selectedValue={values.drugs[index].name}
                                    required={true}
                                    formikHandleChange={handleChange}
                                    errors={!!(errors.drugs && errors.drugs[index] && errors.drugs[index].name)}
                                />
                                <ErrorsMessage errors={errors.drugs && errors.drugs[index] && errors.drugs[index].name}/>
                            </Grid>
                            <Grid className={classes.fixAdd}>
                                <Grid item md={12} sm={12} xs={12} >
                                    <FormControl fullWidth>
                                        <TextField
                                            variant="outlined"
                                            margin="dense"
                                            required
                                            fullWidth
                                            label="Dosis"
                                            name={`drugs[${index}].dose`}
                                            value={values.drugs[index].dose}
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                            }}
                                            onChange={handleChange}
                                            error={!!(errors.drugs && errors.drugs[index] && errors.drugs[index].dose)}
                                        />
                                        <ErrorsMessage errors={errors.drugs && errors.drugs[index] && errors.drugs[index].dose} />
                                    </FormControl>
                                </Grid>
                                <div className={classes.remove}>
                                    <Fab 
                                        disabled={values.drugs && (values.drugs.length <= 1)}
                                        size="small" 
                                        color="secondary" 
                                        aria-label="Delete"
                                        onClick={() => {
                                            console.log('@@@ deleted ->',values.drugs[index].name)
                                            remove(values.drugs[index].name);
                                        }}
                                    >
                                        <DeleteIcon />
                                    </Fab>
                                </div>
                            </Grid>
                        </div>
                        ))}
                        <Grid item md={12} sm={12} xs={12}>
                            <div className={classes.add}>
                                <Fab 
                                    disabled={values.drugs && (values.drugs.length === lockDrugsList.length)}
                                    size="small" 
                                    color="primary" 
                                    aria-label="Add"
                                    onClick={() => push({
                                        name: `${values.drugs && values.drugs.name || ''}`, 
                                        dose: `${values.drugs && values.drugs.dose || ''}`
                                    })}
                                >
                                    <AddIcon />
                                </Fab>
                            </div>
                        </Grid>
                    </Fragment>
                )}
            </FieldArray>
        </Box>
    );
}

export default DrugForm;