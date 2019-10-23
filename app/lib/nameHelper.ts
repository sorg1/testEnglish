import { compact } from 'lodash';

interface Person {
	firstName: string;
	lastName: string;
}

export function getInitials({ firstName, lastName }: Person): string {
	return compact([firstName, lastName])
		.map(s => s.substr(0, 1))
		.join('')
		.toUpperCase();
}

export function getName(obj: Person): string {
	return `${obj.firstName} ${obj.lastName}`;
}
