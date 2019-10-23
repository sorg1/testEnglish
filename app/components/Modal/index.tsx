import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import ModalFooter from './ModalFooter';

const useStyles = makeStyles(theme => ({
    paper: {
        /*margin: 'auto',
        maxWidth: '80%',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)*/
    }
}));

export default function SimpleModal(props) {
    const classes = useStyles();
    const {
        children,
        open,
        headerTitle,
        onClose,
        onDelete,
        onSubmit
    } = props;

    return (<Dialog
        aria-labelledby="form-dialog-title"
        open={open}
        onClose={onClose}
    >
        <div className={classes.paper}>
            <DialogTitle id="form-dialog-title">
                {headerTitle}
            </DialogTitle>
            <DialogContent id="simple-modal-description">
                {children}
            </DialogContent>
            <ModalFooter
                onDelete={onDelete}
                onCancel={onClose}
                onSubmit={onSubmit}
            />
        </div>
    </Dialog>);
}
