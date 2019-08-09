import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
    card: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        //backgroundColor: 'lightBlue',
    },
    MuiCardHeaderAction: {
        alignSelf: 'center'
    },
    content: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingBottom: theme.spacing(0),
    },
    title: {
        fontSize: 14,
    },
    active: {
        backgroundColor: '#c7f0db',
    },
    inactive: {
        backgroundColor: '#ff8080',
    },
    actions: {
        paddingTop: theme.spacing(0),
        paddingBottom: theme.spacing(1),
        backgroundColor: 'lightGrey'
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
      },
    expandOpen: {
        transform: 'rotate(180deg)',
      },
}));

export default styles;