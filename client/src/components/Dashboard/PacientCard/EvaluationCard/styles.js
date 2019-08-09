import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
    card: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    /* editIcon: {
        left: '203px',
        bottom: '8px',
    },
    dataContent: {
        display: 'inline-block',
    }, */
    content: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        /* paddingBottom: '0px !important', */
    },
}));

export default styles;