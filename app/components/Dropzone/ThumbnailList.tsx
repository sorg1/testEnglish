import * as React from 'react';
import { DropzoneFile, OnRemoveCallback } from './types';
import Thumbnail from './Thumbnail';
import { Grid } from '@material-ui/core';
import { GridProps } from '@material-ui/core/Grid';

interface ThumbnailListProps extends GridProps {
	files: DropzoneFile[];
	onRemove: OnRemoveCallback;
}

export default class ThumbnailList extends React.Component<ThumbnailListProps> {
	render() {
		const { files, onRemove, ...props } = this.props;
		return (
			<Grid container spacing={1} {...props}>
				{files.map((file, i) => (
					<Grid key={i} item>
						<Thumbnail file={file} onRemove={onRemove} />
					</Grid>
				))}
			</Grid>
		);
	}
}
