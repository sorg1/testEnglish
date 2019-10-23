import { UIOrderStatus } from '@api/v1';

export interface Order {
	id: number;
	title: string;
	description: string;
	status: UIOrderStatus;
	orderer?: Customer;
	comments?: OrderComment[];
	createdAt: string;
	updatedAt: string;
}
export interface OrderComment {
	id: number;
	orderId: number;
	text: string;
	author?: OrderCommentAuthor;
	createdAt: string;
}
export interface OrderCommentAuthor {
	id: number;
	name: string;
	initials: string;
	type: 'INTERNAL' | 'EXTERNAL';
}
export type OrderStatistics = { [key in UIOrderStatus]: number };
export interface Customer {
	id: number;
	name: string;
}
