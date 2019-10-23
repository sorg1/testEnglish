import * as countries from 'i18n-iso-countries';
import * as de from 'i18n-iso-countries/langs/de.json';
import { ResponseAddress } from '@api/v1';
import { compact } from 'lodash';

countries.registerLocale(de);

export function getCountryNameByCode(code: string) {
	return countries.getName(code, 'de');
}

export function getGoogleMapsLink(address: ResponseAddress) {
	return `https://maps.google.com/?q=${encodeURIComponent(
		displayAddress(address)
	)}`;
}

export function displayAddress(address: ResponseAddress): string {
	if (!address) return null;
	return compact([
		address.streetAddress,
		compact([address.postalCode, address.locality]).join(' '),
		getCountryNameByCode(address.country)
	]).join(', ');
}
