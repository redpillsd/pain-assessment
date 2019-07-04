import React from 'react';
import { TextField, Grid, Fab, InputAdornment, Box } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import styles from './styles';

import SelectInput from '../../SelectInput';

import lockDrugsList from '../../../mockData/lockDrugsList';

const DrugForm = () => {
    const classes = styles();

    return (
        <Box border={1} borderColor={'rgba(0, 0, 0, 0.23)'} borderRadius={5}>
            <div className={classes.paper}>
                <Grid item md={12} sm={12} xs={12}>
                    <SelectInput
                        id={'drug'}
                        name={'drug'}
                        label={'Droga'}
                        itemList={lockDrugsList}
                    />
                </Grid>
                <Grid className={classes.fixAdd}>
                    <Grid item md={12} sm={12} xs={12} >
                        <TextField
                            variant="outlined"
                            margin="dense"
                            required
                            fullWidth
                            id="dose"
                            label="Dosis"
                            name="dose"
                            InputProps={{
                                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                            }}
                        />
                    </Grid>
                    <div className={classes.add}>
                        <Fab size="small" color="secondary" aria-label="Add">
                            <AddIcon />
                        </Fab>
                    </div>
                </Grid>
            </div>
        </Box>
    );
}

export default DrugForm;