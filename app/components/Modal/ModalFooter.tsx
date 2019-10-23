import * as React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    buttonContainer: {},
    deleteButton: {}
}));

function ModalFooter(props) {
    const classes = useStyles();
    const {
        t,
        onDelete,
        onCancel,
        onSubmit
    } = props;

    return (<DialogActions className={classes.buttonContainer}>
        { onDelete ? <Button onClick={onDelete} color="secondary" variant="contained" className={classes.deleteButton}>
            {t('modal:cta_delete')}
        </Button> : null }
        <Button onClick={onCancel} variant="contained">
            {t('modal:cta_cancel')}
        </Button>
        <Button onClick={onSubmit} color="primary" variant="contained">
            {t('modal:cta_create')}
        </Button>
    </DialogActions>);
}

export default withTranslation()(ModalFooter);
