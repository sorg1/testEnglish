import * as React from 'react';
import { Fade } from '@material-ui/core';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
	src: string;
}

export default class Image extends React.Component<ImageProps> {
	state = {
		loaded: false
	};
	onLoad = () => this.setState({ loaded: true });
	render() {
		return (
			<Fade in={this.state.loaded}>
				<img {...this.props} onLoad={this.onLoad} />
			</Fade>
		);
	}
}
