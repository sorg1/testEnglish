import * as React from 'react';
import {
	Typography,
	withStyles,
	WithStyles,
	createStyles,
	Theme
} from '@material-ui/core';
import { withTranslation, WithTranslation } from 'react-i18next';

const styles = (theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
			flexWrap: 'wrap',
			justifyContent: 'center',
			padding: theme.spacing(1)
		},
		item: {
			padding: theme.spacing(1)
		},
		link: {
			color: 'unset'
		}
	});

interface FooterProps extends WithTranslation, WithStyles<typeof styles> {}

class Footer extends React.Component<FooterProps> {
	render() {
		const { t, classes } = this.props;
		return (
			<div className={classes.root}>
				<div className={classes.item}>
					<Typography variant="body2">
						<a
							href="https://www.linkedin.com/in/serhii-riabokon-b006a1a1/"
							target="_blank"
							className={classes.link}
						>
                            {t('footer:developer')}
						</a>
					</Typography>
				</div>
			</div>
		);
	}
}

export default withTranslation()(withStyles(styles)(Footer));
