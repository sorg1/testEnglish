import { Omit } from '@material-ui/core';
import { AnyAction } from 'redux';

export interface DropzoneFile {
	tempId: string;
	fileName: string;
	fileType: string;
	s3Key: string;
	thumbnailS3Key?: string;
	preview?: string;
	progress?: number;
	error?: boolean;
}

type FileAddFunction<T> = (file: DropzoneFile) => T;
type FileChangeFunction<T> = (
	tempId: DropzoneFile['tempId'],
	data: Omit<DropzoneFile, 'tempId'>
) => T;
type FileRemoveFunction<T> = (tempId: DropzoneFile['tempId']) => T;

export type OnRemoveCallback = FileRemoveFunction<void>;
export type OnChangeFileCallback = FileChangeFunction<void>;

export type AddFileAction = FileAddFunction<{
	type: string;
	payload: DropzoneFile;
}>;
export type ChangeFileAction = FileChangeFunction<{
	type: string;
	payload: {
		tempId: DropzoneFile['tempId'];
		file: Partial<DropzoneFile>;
	};
}>;
export type RemoveFileAction = FileRemoveFunction<{
	type: string;
	payload: DropzoneFile['tempId'];
}>;

export type AddFileActionCreator = (type: string) => AddFileAction;
export type ChangeFileActionCreator = (type: string) => ChangeFileAction;
export type RemoveFileActionCreator = (type: string) => RemoveFileAction;

export type FilesReducer = (
	state: DropzoneFile[],
	action: AnyAction
) => DropzoneFile[];
