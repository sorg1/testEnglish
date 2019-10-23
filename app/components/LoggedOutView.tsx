import * as React from 'react';
import Card from '@material-ui/core/Card';
import {
	withStyles,
	Theme,
	createStyles,
	WithStyles
} from '@material-ui/core/styles';
import Footer from '../core/Footer';

const styles = (theme: Theme) =>
	createStyles({
		root: {
			flexDirection: 'column',
			alignItems: 'flex-start',
			overflowY: 'auto'
		},
		cardWrapper: {
			flex: '1 1 100%',
			width: '100%',
			height: '100%',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			[theme.breakpoints.down('sm')]: {
				justifyContent: 'start'
			}
		},
		card: {
			minWidth: 400,
			maxWidth: 800,
			margin: '0 auto',
			[theme.breakpoints.down('xs')]: {
				minWidth: 'unset',
				width: '100%'
			}
		}
	});

interface LoggedOutViewProps extends WithStyles<typeof styles> {}

class LoggedOutView extends React.Component<LoggedOutViewProps> {
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<div className={classes.cardWrapper}>
					<div>
						<Card className={classes.card}>{this.props.children}</Card>
						<Footer />
					</div>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(LoggedOutView);
