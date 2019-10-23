import i18n from '../../i18n';
import api from '../../lib/api';
import createConstants from '../../lib/createConstants';
import { showNotification } from '../actions';

export const constants = createConstants([
	'FETCH_QUESTION',
	'CREATE_ANSWER'
]);

export const fetchQuestion = () => dispatch =>
    dispatch({
        type: constants.FETCH_QUESTION,
        payload: api
            .get('/questions')
            .then(({ data }) => {
                return data[0];
            })
            .catch(err => {
                dispatch(showNotification(i18n.t('admin:error'), 'error'));
                throw err;
            })
    });

export const createAnswer = (body) => dispatch =>
	dispatch({
		type: constants.CREATE_ANSWER,
		payload: api
			.post('/answers', body)
			.then(({ data }) => {
                dispatch(showNotification(i18n.t('admin:success'), 'success'));
                return data;
			})
			.catch(err => {
				dispatch(showNotification(i18n.t('admin:error'), 'error'));
				throw err;
			})
	});
