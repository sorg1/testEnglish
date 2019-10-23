import * as React from 'react';
import {
	Card,
	Typography,
	withStyles,
	Theme,
	createStyles,
	WithStyles
} from '@material-ui/core';

const styles = (theme: Theme) =>
	createStyles({
		container: {
			margin: theme.spacing(1, 0)
		},
		child: {
			padding: theme.spacing(1),
			background: theme.palette.grey[300]
		}
	});

interface SectionHeaderProps extends WithStyles<typeof styles> {}

class SectionHeader extends React.Component<SectionHeaderProps> {
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.container}>
				<Card className={classes.child}>
					<Typography>{this.props.children}</Typography>
				</Card>
			</div>
		);
	}
}

export default withStyles(styles)(SectionHeader);
