import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
    list: {
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(0),
    },
    listItem: {
        backgroundColor: '#e0e0e0',
        borderRadius: theme.spacing(0.5),
        marginTop: theme.spacing(0.5),
    },
    iconButton: {
        right: theme.spacing(-1),
    }
}));

export default styles;