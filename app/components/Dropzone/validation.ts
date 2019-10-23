import { DropzoneFile } from './types';
import { reduce } from 'lodash';

export function isReadyToUpload(files: DropzoneFile[]): boolean {
	return reduce(
		files,
		function(result, file) {
			return result && isUploaded(file);
		},
		true
	);
}

export function containsFailedFiles(files: DropzoneFile[]): boolean {
	return reduce(
		files,
		function(result, file) {
			return result || hasFailed(file);
		},
		false
	);
}

export function isUploaded(file: DropzoneFile): boolean {
	return Boolean(file.s3Key);
}

export function hasFailed(file: DropzoneFile): boolean {
	return Boolean(file.error);
}
