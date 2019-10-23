import * as React from 'react';
import { Theme, withStyles, createStyles, WithStyles } from '@material-ui/core';
import { yellow } from '@material-ui/core/colors';

const styles = (theme: Theme) =>
	createStyles({
		blockquote: {
			margin: theme.spacing(3, 0),
			padding: theme.spacing(1, 3),
			borderLeft: `${theme.spacing(0.5)}px solid ${yellow[300]}`,
			backgroundColor: yellow[50],
			width: '100%'
		}
	});

interface BlockquoteProps extends WithStyles<typeof styles> {
	content: React.ReactNode;
}

class Blockquote extends React.Component<BlockquoteProps> {
	render() {
		const { content, classes } = this.props;
		return <blockquote className={classes.blockquote}>{content}</blockquote>;
	}
}

export default withStyles(styles)(Blockquote);
