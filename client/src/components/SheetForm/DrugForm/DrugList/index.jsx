import React, { Fragment } from 'react';
import { List, ListItem, ListItemSecondaryAction, ListItemText, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import _isEmpty from 'lodash/isEmpty';

import styles from './styles';

const DrugList = ({ drugs, deleteDrug }) => {
    console.log('@@@ drugs add', drugs.lenght)
    const classes = styles();

    const renderList = () => {
        /* console.log(_isEmpty(drugs) || (drugs.name === undefined || drugs.dose === undefined))
        if (_isEmpty(drugs) || (drugs.name === undefined || drugs.dose === undefined)) {
            return <Fragment />
        } */

        return (
            <List className={classes.list}>
                {drugs.lenght > 0 && drugs.map((item, index) => (
                    <ListItem key={index.toString()} dense className={classes.listItem}>
                        <ListItemText primary={`${item[index].name.toString()} ${item[index].dose.toString()}`} />
                        <ListItemSecondaryAction>
                            <IconButton
                                className={classes.iconButton}
                                aria-label="Delete"
                                size="small"
                                onClick={() => {
                                    deleteDrug(index);
                                }}
                            >
                                <DeleteIcon fontSize="small"/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        );
    }

    return renderList();
};

export default DrugList;
