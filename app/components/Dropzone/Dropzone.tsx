import * as React from 'react';
import uuid from 'uuid';
import Dropzone, { DropzoneProps, DropzoneState } from 'react-dropzone';
import {
	withStyles,
	WithStyles,
	Theme,
	Typography,
	createStyles,
	Omit
} from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import api from '../../lib/api';
import { DropzoneFile, OnRemoveCallback, OnChangeFileCallback } from './types';
import ThumbnailList from './ThumbnailList';
import classNames from 'classnames';

const styles = (theme: Theme) =>
	createStyles({
		zone: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			background: theme.palette.background.default,
			padding: theme.spacing(2),
			border: `1px dashed ${theme.palette.text.hint}`,
			cursor: 'pointer',
			outline: 'none',
			transition: theme.transitions.create('background')
		},
		list: {
			paddingBottom: theme.spacing(2)
		},
		disabled: {
			cursor: 'not-allowed',
			color: theme.palette.text.disabled
		},
		accept: {
			background: theme.palette.success.light
		},
		reject: {
			background: theme.palette.error.light
		}
	});

interface OwnProps extends Omit<DropzoneProps, 'onDrop'> {
	text: string;
	files?: DropzoneFile[];
	onDrop: (info: DropzoneFile) => void;
	onRemove: OnRemoveCallback;
	onChangeFile: OnChangeFileCallback;
}

interface MaterialDropzoneProps extends WithStyles<typeof styles>, OwnProps {}

class MaterialDropzone extends React.Component<MaterialDropzoneProps> {
	onDrop(files: File[]) {
		files.forEach(file => {
			const tempId = uuid();
			const preview = URL.createObjectURL(file);
			this.props.onDrop({
				tempId,
				fileName: file.name,
				fileType: file.type,
				s3Key: null,
				preview,
				progress: 0
			});
			api
				.uploadFile(file, {
					onUploadProgress: event => {
						const percentCompleted = Math.floor(
							(event.loaded * 100) / event.total
						);
						this.props.onChangeFile(tempId, {
							fileName: file.name,
							fileType: file.type,
							s3Key: null,
							preview,
							progress: Math.min(percentCompleted, 93)
						});
					}
				})
				.then(({ data }) => {
					this.props.onChangeFile(tempId, {
						fileName: data.originalName,
						fileType: file.type,
						preview,
						s3Key: data.s3Key,
						thumbnailS3Key: data.thumbnailS3Key,
						progress: 100
					});
				})
				.catch(() => {
					this.props.onChangeFile(tempId, {
						fileName: file.name,
						fileType: file.type,
						s3Key: null,
						preview,
						progress: 100,
						error: true
					});
				});
		});
	}
	render() {
		const {
			text,
			files,
			onDrop,
			onChangeFile,
			onRemove,
			classes,
			...props
		} = this.props;
		return (
			<Dropzone onDropAccepted={this.onDrop.bind(this)} {...props}>
				{({
					getRootProps,
					getInputProps,
					isDragAccept,
					isDragReject
				}: DropzoneState) => (
					<div
						className={classNames(classes.zone, {
							[classes.accept]: isDragAccept,
							[classes.reject]: isDragReject,
							[classes.disabled]: props.disabled
						})}
						{...getRootProps()}
					>
						<input {...getInputProps()} />
						{files && files.length ? (
							<ThumbnailList
								files={files}
								onRemove={onRemove}
								className={classes.list}
							/>
						) : null}
						<Typography color="inherit" variant="subtitle1">
							{text}
						</Typography>
						<CloudUploadIcon />
					</div>
				)}
			</Dropzone>
		);
	}
}

interface ImageFile extends File {
	preview?: string;
}

export default withStyles(styles)(MaterialDropzone);
export { OwnProps as DropzoneProps };
