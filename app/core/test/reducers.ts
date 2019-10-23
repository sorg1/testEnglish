import { constants } from './actions';
import { combineReducers } from 'redux';

const FULFILLED = '_FULFILLED';
const REJECTED = '_REJECTED';

export interface TestState {
	isLoading: boolean;
	question;
}

export default combineReducers<TestState>({
    isLoading: (state = true, action) => {
        switch (action.type) {
            case constants.FETCH_QUESTION + REJECTED:
            case constants.FETCH_QUESTION + FULFILLED: {
                return false;
            }
            default:
                return state;
        }
    },
    question: (state = null, action) => {
		switch (action.type) {
			case constants.FETCH_QUESTION + FULFILLED: {
				return action.payload;
			}
			default:
				return state;
		}
	}
});
