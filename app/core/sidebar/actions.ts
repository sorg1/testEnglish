import createConstants from '../../lib/createConstants';

export const constants = createConstants(['OPEN_SIDEBAR', 'CLOSE_SIDEBAR']);

export function openSidebar() {
	return {
		type: constants.OPEN_SIDEBAR
	};
}

export function closeSidebar() {
	return {
		type: constants.CLOSE_SIDEBAR
	};
}
