import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import styles from './styles';
// TODO add the logic for the evaluationId
const EvaluationCard = ({ active, evaluationId }) => {
    const classes = styles();

    return (
        <Card className={classes.card}>
            <CardContent className={classes.content}>
                <Typography variant="body1" component="p">
                    12/07/2019 - 18:45hs
                </Typography>
                <Typography variant="body2" component="p">
                    Ritmo de Infusion: 10 ml/hora
                </Typography>
                <Typography variant="body2" component="p">
                    Nivel de Dolor: {/* <SentimentSatisfied /> */} 10
                </Typography>
                <Typography variant="body2" component="p">
                    Rescate: Clonazepam 2mg
                </Typography>
                <Typography variant="body2" component="p">
                    Efectos adversos: lalala lalal lalalalalal 
                </Typography>
                <Typography variant="body2" component="p">
                    <b>Nota: esto es una nota</b>
                </Typography>
                <Typography variant="body2" component="p">
                    Evaluador: Don Ñoqui
                </Typography>
                {/* <IconButton
                    component={Link}
                    href="/evaluation"
                    className={classes.editIcon}
                >
                    <EditIcon />
                </IconButton> */}
            </CardContent>
        </Card>
    );
}

export default EvaluationCard;