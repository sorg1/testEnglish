import * as React from 'react';
import {
	Theme,
	withStyles,
	createStyles,
	WithStyles,
	Typography
} from '@material-ui/core';
import classNames from 'classnames';

const styles = (theme: Theme) =>
	createStyles({
		flex: {
			display: 'flex',
			alignItems: 'start'
		},
		icon: {
			marginRight: theme.spacing(1)
		},
		text: {
			textAlign: 'start',
			paddingTop: theme.spacing(0.25),
			'& > *': {
				textDecoration: 'none',
				color: 'inherit'
			}
		}
	});

interface IconicTextProps extends WithStyles<typeof styles> {
	icon: React.ReactNode;
	text: React.ReactNode;
	className?: string;
}

class IconicText extends React.Component<IconicTextProps> {
	render() {
		const { icon, text, className, classes } = this.props;
		return (
			<div className={classNames(classes.flex, className)}>
				<div className={classes.icon}>{icon}</div>
				<Typography variant="body2" className={classes.text}>
					{text}
				</Typography>
			</div>
		);
	}
}

export default withStyles(styles)(IconicText);
