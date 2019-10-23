import * as React from 'react';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core';

const styles = (theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
			flexWrap: 'wrap',
			margin: `-${theme.spacing(0.5)}px`,
			'& > *': {
				padding: theme.spacing(0.5)
			}
		}
	});

type AttachmentListProps = WithStyles<typeof styles> & {};

class AttachmentList extends React.Component<AttachmentListProps> {
	render() {
		const { children, classes } = this.props;
		return <div className={classes.root}>{children}</div>;
	}
}

export default withStyles(styles)(AttachmentList);
