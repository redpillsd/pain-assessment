import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    checkbox: {
        marginLeft: theme.spacing(0),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    fab: {
        /* position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2), */
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    /* hide: {
        display: 'none'
    },
    show: {
        display: 'block'
    } */
}));

export default styles;