import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
    },
    list: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

export default styles;