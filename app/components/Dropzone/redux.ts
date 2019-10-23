import _ from 'lodash';
import {
	FilesReducer,
	AddFileActionCreator,
	ChangeFileActionCreator,
	RemoveFileActionCreator
} from './types';

export const createAddFileAction: AddFileActionCreator = type => file => ({
	type,
	payload: file
});
export const createChangeFileAction: ChangeFileActionCreator = type => (
	tempId,
	file
) => ({
	type,
	payload: { tempId, file }
});
export const createRemoveFileAction: RemoveFileActionCreator = type => tempId => ({
	type,
	payload: tempId
});

export const handleAddFile: FilesReducer = (state, action) => {
	return _.concat([], state, action.payload);
};
export const handleChangeFile: FilesReducer = (state, action) => {
	const { payload } = action;
	return _.map(state, function(file) {
		if (file.tempId === payload.tempId) {
			return { tempId: payload.tempId, ...payload.file };
		}
		return file;
	});
};
export const handleRemoveFile: FilesReducer = (state, action) => {
	return _.filter(state, file => file.tempId !== action.payload);
};
