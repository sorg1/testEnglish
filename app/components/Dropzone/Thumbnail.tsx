import * as React from 'react';
import {
	withStyles,
	WithStyles,
	createStyles,
	Theme,
	Typography,
	IconButton,
	LinearProgress,
	Paper,
	GridListTileBar
} from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Close';
import { DropzoneFile, OnRemoveCallback } from './types';
import Image from '../Image';
import cx from 'classnames';
import { isUploaded, hasFailed } from './validation';

const styles = (theme: Theme) =>
	createStyles({
		root: {
			position: 'relative',
			width: theme.spacing(20),
			height: theme.spacing(15),
			background: theme.palette.grey['200'],
			cursor: 'default'
		},
		image: {
			position: 'absolute',
			width: theme.spacing(20),
			height: theme.spacing(15),
			objectFit: 'cover'
		},
		topBar: {
			background:
				'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
			color: 'white'
		},
		caption: {
			padding: theme.spacing(1),
			position: 'absolute',
			left: 0,
			right: 0,
			bottom: 0,
			background: 'rgba(0,0,0,0.5)',
			color: 'white'
		},
		remove: {
			position: 'absolute',
			right: 0,
			background: 'radial-gradient(rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 50%)',
			color: 'white',
			borderRadius: '50%'
		},
		progress: {
			position: 'absolute',
			left: 0,
			right: 0,
			bottom: 0
		},
		progressBar: {
			transition: theme.transitions.create('background')
		},
		progressBarSuccess: {
			background: theme.palette.success.main
		},
		progressBarFailure: {
			background: theme.palette.error.main
		},
		transparent: {
			background: 'transparent'
		}
	});

interface ThumbnailProps extends WithStyles<typeof styles> {
	file: DropzoneFile;
	onRemove: OnRemoveCallback;
}

class Thumbnail extends React.Component<ThumbnailProps> {
	onRemove() {
		const { file, onRemove } = this.props;
		URL.revokeObjectURL(file.preview);
		onRemove(file.tempId);
	}
	render() {
		const { file, onRemove, classes } = this.props;
		return (
			<Paper
				elevation={1}
				className={classes.root}
				square
				onClick={e => e.stopPropagation()}
			>
				{file.preview ? (
					<Image src={file.preview} className={classes.image} />
				) : null}
				<GridListTileBar
					className={classes.topBar}
					titlePosition="top"
					actionIcon={
						<IconButton color="inherit" onClick={() => this.onRemove()}>
							<RemoveIcon />
						</IconButton>
					}
					actionPosition="right"
				/>
				<GridListTileBar title={file.fileName} />
				<LinearProgress
					classes={{
						root: classes.progress,
						colorPrimary: classes.transparent,
						barColorPrimary: cx(classes.progressBar, {
							[classes.progressBarSuccess]: isUploaded(file),
							[classes.progressBarFailure]: hasFailed(file)
						})
					}}
					variant="determinate"
					value={file.progress}
				/>
			</Paper>
		);
	}
}

export default withStyles(styles)(Thumbnail);
