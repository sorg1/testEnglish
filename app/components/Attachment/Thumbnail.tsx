import * as React from 'react';
import {
	withStyles,
	createStyles,
	Theme,
	WithStyles,
	ButtonBase,
	GridListTileBar
} from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import Image from '../Image';

const styles = (theme: Theme) =>
	createStyles({
		root: {
			color: 'unset'
		},
		background: {
			width: theme.spacing(16),
			height: theme.spacing(10),
			background: theme.palette.grey['200'],
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			position: 'relative'
		},
		image: {
			position: 'absolute',
			width: theme.spacing(16),
			height: theme.spacing(10),
			objectFit: 'cover'
		},
		icon: {
			fontSize: theme.spacing(6)
		}
	});

type AttachmentProps = WithStyles<typeof styles> & {
	name: string;
	link: string;
	thumbnail?: string;
};

class Attachment extends React.Component<AttachmentProps> {
	render() {
		const { name, link, thumbnail, classes } = this.props;
		return (
			<a href={link} className={classes.root}>
				<ButtonBase>
					<div className={classes.background}>
						<ImageIcon className={classes.icon} />
						{thumbnail ? (
							<Image src={thumbnail} className={classes.image} />
						) : null}
					</div>
					<GridListTileBar title={name} />
				</ButtonBase>
			</a>
		);
	}
}

export default withStyles(styles)(Attachment);
