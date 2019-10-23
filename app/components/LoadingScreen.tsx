import * as React from 'react';
import {
	createStyles,
	withStyles,
	WithStyles,
	CircularProgress
} from '@material-ui/core';
import cx from 'classnames';

const styles = createStyles({
	root: {
		width: '100%',
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	}
});

interface LoadingScreenProps extends WithStyles<typeof styles> {
	className?: string;
}

class LoadingScreen extends React.Component<LoadingScreenProps> {
	render() {
		return (
			<div className={cx(this.props.classes.root, this.props.className)}>
				<CircularProgress />
			</div>
		);
	}
}

export default withStyles(styles)(LoadingScreen);
