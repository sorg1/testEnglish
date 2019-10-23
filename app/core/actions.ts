import { BResendConfirmEmail } from '@api/v1';
import createConstants from '../lib/createConstants';
import api from '../lib/api';
import i18n from '../i18n';

export type NotificationVariant = 'info' | 'success' | 'error';

export const constants = createConstants([
	'SHOW_NOTIFICATION',
	'HIDE_NOTIFICATION',
	'RESEND_CONFIRM_EMAIL'
]);

export const hideNotification = () => ({
	type: constants.HIDE_NOTIFICATION
});

export const showNotification = (
	message: React.ReactNode,
	variant: NotificationVariant
) => dispatch => {
	dispatch(hideNotification());
	setTimeout(
		() =>
			dispatch({
				type: constants.SHOW_NOTIFICATION,
				payload: {
					message,
					variant
				}
			}),
		200
	);
};

export const resendConfirmEmail = (body: BResendConfirmEmail) => dispatch => ({
	type: constants.RESEND_CONFIRM_EMAIL,
	payload: api
		.post('/api/v1/user/actions/send_email_address_confirmation_email')
		.then(({ data }) => {
			dispatch(
				showNotification(i18n.t('registration:resend_confirm_email'), 'success')
			);
			return data;
		})
		.catch(err => {
			dispatch(showNotification(i18n.t('general:generic_error'), 'error'));
			throw err;
		})
});
