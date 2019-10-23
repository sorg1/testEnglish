import { combineReducers } from 'redux';
import { constants } from './actions';

export interface SidebarState {
	open: boolean;
}

export default combineReducers<SidebarState>({
	open: (state = false, action) => {
		switch (action.type) {
			case constants.OPEN_SIDEBAR:
				return true;
			case constants.CLOSE_SIDEBAR:
				return false;
			default:
				return state;
		}
	}
});
