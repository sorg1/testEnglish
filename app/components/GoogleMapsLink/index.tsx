import * as React from 'react';
import { ResponseAddress } from '@api/v1';
import { displayAddress, getGoogleMapsLink } from '../../lib/address';

interface GoogleMapsLinkProps
	extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	address: ResponseAddress;
}

export class GoogleMapsLink extends React.Component<GoogleMapsLinkProps> {
	render() {
		const { address, ...props } = this.props;
		return (
			<a
				{...props}
				target="_blank"
				href={getGoogleMapsLink(this.props.address)}
			>
				{displayAddress(this.props.address)}
			</a>
		);
	}
}
