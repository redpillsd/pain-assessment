import React from 'react';
import { List, ListItem, ListItemSecondaryAction, ListItemText, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import styles from './styles';

const DrugList = ({ drugs, deleteDrug }) => {
    const classes = styles();
    return (
        <List className={classes.list}>
            {drugs.map((drug, index) => (
                <ListItem key={index.toString()} dense className={classes.listItem}>
                    <ListItemText primary={drug} />
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
};

export default DrugList;
