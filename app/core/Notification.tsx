import * as React from 'react';
import { connect } from 'react-redux';
import {
	Snackbar,
	SnackbarContent,
	IconButton,
	Theme,
	createStyles,
	withStyles,
	WithStyles
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { hideNotification } from './actions';
import { State } from './reducers';

const styles = (theme: Theme) =>
	createStyles({
		error: {
			background: theme.palette.error.main,
			color: theme.palette.error.contrastText,
			'& a': {
				color: 'inherit'
			}
		},
		success: {
			background: theme.palette.success.main,
			color: theme.palette.success.contrastText
		}
	});

const mapStateToProps = (state: State) => ({
	open: state.notification.open,
	variant: state.notification.variant,
	message: state.notification.message
});
const mapDispatchToProps = dispatch => ({
	hideNotification: () => dispatch(hideNotification())
});

interface NotificationProps
	extends WithStyles<typeof styles>,
		ReturnType<typeof mapStateToProps>,
		ReturnType<typeof mapDispatchToProps> {}

class Notification extends React.Component<NotificationProps> {
	onClose(event, reason) {
		if (reason === 'clickaway') {
			return;
		}
		this.props.hideNotification();
	}
	render() {
		const { open, variant, message, classes } = this.props;
		return (
			<Snackbar
				open={open}
				autoHideDuration={4000}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center'
				}}
				onClose={this.onClose.bind(this)}
			>
				<SnackbarContent
					className={classes[variant]}
					message={message}
					action={
						<div>
							<IconButton
								key="close"
								aria-label="Close"
								color="inherit"
								onClick={this.onClose.bind(this)}
							>
								<CloseIcon />
							</IconButton>
						</div>
					}
				/>
			</Snackbar>
		);
	}
}

export default withStyles(styles)(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Notification)
);
