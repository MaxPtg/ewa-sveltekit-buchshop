export interface User {
	id: number;
	username: string;
	email: string;
	provider: string;
	confirmed: boolean;
	blocked: boolean;
	bookstore_role: string;
	address: string;
	zipcode: string;
	city: string;
	country: string;
	createdAt: string;
	updatedAt: string;
}

export interface AuthenticatedUser {
	jwt: string;
	user: User;
}
