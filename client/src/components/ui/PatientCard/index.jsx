import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import AddIcon from '@material-ui/icons/Add';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import EvaluationCard from './EvaluationCard'

import styles from './styles';
// TODO add the logic for the sheetId
const PatientCard = ({ active, fullCard, sheetId }) => {
    const classes = styles();

    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    }

    const cardHeader = fullCard ?   <CardHeader
                                        className={active ? classes.active : classes.inactive}
                                        title="Fulano Mengano"
                                        subheader="Ingresó: 27/07/19"
                                    /> :
                                    <CardHeader
                                        title="Fulano Mengano"
                                    />;


    return (
        <Card className={classes.card}>
            { cardHeader }
            <CardContent className={classes.content}>
                { fullCard && <Typography variant="h6" component="p">
                    Bomba y Bloqueo
                </Typography> }
                <Typography variant="body1" component="p">
                    Habitación: 24A
                </Typography>
                <Typography variant="body1" component="p">
                    Edad: 38 Años
                </Typography>
                <Typography variant="body1" component="p">
                    Peso: 133 Kg
                </Typography>
            </CardContent>
            { fullCard && <CardActions>
                <IconButton
                    component={Link}
                    href="/sheet"
                >
                    <EditIcon />
                </IconButton>
                <IconButton
                    component={Link}
                    href="/evaluation"
                >
                    <SentimentSatisfiedAltIcon />
                </IconButton>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions> }
            { fullCard && <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <EvaluationCard />
                    <EvaluationCard />
                    <EvaluationCard />
                    <EvaluationCard />
                    <EvaluationCard />
                </CardContent>
                {/* <CardContent>
                <Typography paragraph>Method:</Typography>
                <Typography paragraph>
                    Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                    minutes.
                </Typography>
                <Typography paragraph>
                    Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                    heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                    browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
                    and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
                    pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
                    saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                </Typography>
                <Typography paragraph>
                    Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
                    without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
                    medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
                    again without stirring, until mussels have opened and rice is just tender, 5 to 7
                    minutes more. (Discard any mussels that don’t open.)
                </Typography>
                <Typography>
                    Set aside off of the heat to let rest for 10 minutes, and then serve.
                </Typography>
                </CardContent> */}
            </Collapse> }
        </Card>
    );
}

export default PatientCard;