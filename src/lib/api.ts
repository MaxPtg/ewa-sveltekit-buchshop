import axios, { Axios, AxiosError } from 'axios';
import { log } from '$lib/util';
import type { User } from './api.types';

const baseURL: string = 'http://localhost:1337/api';
const PUBLIC_API_TOKEN: string =
	'93fb67210ee7dcac91c6d9f35cf1b3f0f2cc20a9774e3b9e5d1a44d32dffb91590c3fe966312ed666522bb681542cd1f2d78a6dfe14c609ea114a405d2e06f074776a9c09c50f106a0c3fc819b0bee79eaabaf14c8a90351b5954b3748732ea70729c5311b392b8a33f0074794f3ad638161e4ac6decc102fc8b9bdde8f0471f';

const headers = {
	Authorization: `Bearer ${PUBLIC_API_TOKEN}`,
	'Content-Type': 'application/json'
};

/* ====================================================== */
/* ===== Auth Operations =====  */
/* ====================================================== */

export async function authLogin(username: string, password: string) {
	try {
		const body = {
			identifier: username,
			password: password
		};

		const response = await axios.post(`${baseURL}/auth/local`, body, { headers });

		const authenticatedUser = response.data;

		return { success: true, authenticatedUser };
	} catch (error) {
		const axiosError = error as AxiosError<any>;

		if (axiosError && axiosError?.response?.status === 400) {
			log(`API => Error authenticating user ${username}: Invalid Credentials`);
			return { success: false, error: axiosError?.response?.data?.error?.message };
		} else {
			log(`API => Error authenticating user ${username}: Unknown Error`);
			return { success: false, error: axiosError?.message || 'Unknown error' };
		}
	}
}

/* ====================================================== */
/* ===== Book Operations =====  */
/* ====================================================== */

export async function getBooks() {
	try {
		const response = await axios.get(`${baseURL}/bookstore-books`, { headers });

		if (response.status !== 200) {
			log(`API => Error fetching bookstore-books: Bad Request`);
			throw new Error(response.data?.error);
		}

		const books = response.data?.data;

		return { success: true, books };
	} catch (error) {
		log(`API => Error fetching bookstore-books: Unknown Error`);
		throw new Error(String(error));
	}
}

export async function getBook(id: number) {
	try {
		const response = await axios.get(`${baseURL}/bookstore-books/${id}`, { headers });

		if (response.status !== 200) {
			log(`API => Error fetching bookstore-book with id ${id}: Bad Request`);
			throw new Error(response.data?.error);
		}

		const book = response.data?.data;
	
		return { success: true, book };
	} catch (error) {
		log(`API => Error fetching bookstore-book with id ${id}: Unknown Error`);
		throw new Error(String(error));
	}
}

/* ====================================================== */
/* ===== Order Operations =====  */
/* ====================================================== */
