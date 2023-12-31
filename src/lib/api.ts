import axios, { Axios, AxiosError } from 'axios';
import { log } from '$lib/util';
import type { User } from './api.types';

const baseURL: string = 'http://127.0.0.1:1337/api';
const PUBLIC_API_TOKEN: string = 'd375b795b3fc63708dfe635f95002690babd9bf2d130cb70922fa24595821cfad106c51d1b9b0456a53bb265bc494788c1968975a097678829f322e0a0fa5df41052f3b40436e7dab00ee170e7e5cc9dc1f9f88bed57326da99d62741bb4f361a696a0e25b11e9ec443b090287d8ed730c7370fb25a0674426aa3c5442d5e89a';

//Max API-Key: '93fb67210ee7dcac91c6d9f35cf1b3f0f2cc20a9774e3b9e5d1a44d32dffb91590c3fe966312ed666522bb681542cd1f2d78a6dfe14c609ea114a405d2e06f074776a9c09c50f106a0c3fc819b0bee79eaabaf14c8a90351b5954b3748732ea70729c5311b392b8a33f0074794f3ad638161e4ac6decc102fc8b9bdde8f0471f';

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

export async function updateBookQuantity(id: number, newQuantity: number) {
    try {
        const response = await axios.put(`${baseURL}/bookstore-books/${id}`, {
            data: {
                quantity: newQuantity
            }
        }, { headers });

        if (response.status !== 200) {
            log(`API => Error updating bookstore-book with id ${id}: Bad Request`);
            throw new Error(response.data?.error);
        }

        return { success: true };
    } catch (error) {
        log(`API => Error updating bookstore-book with id ${id}: Unknown Error`);
        throw new Error(String(error));
    }
}

/* ====================================================== */
/* ===== Order Operations =====  */
/* ====================================================== */

export async function getOrders() {
	try {
		const response = await axios.get(`${baseURL}/bookstore-orders`, { headers });
		//const response = await axios.get(`${baseURL}/bookstore-orders?populate=*`, { headers });

		if (response.status !== 200) {
			log(`API => Error fetching bookstore-orders: Bad Request`);
			throw new Error(response.data?.error);
		}

		const orders = response.data?.data;

		return { success: true, orders };
	} catch (error) {
		log(`API => Error fetching bookstore-orders: Unknown Error`);
		throw new Error(String(error));
	}
}

export async function getOrderDetails(orderId: number) {
	try {
		const response = await axios.get(`${baseURL}/bookstore-orders/${orderId}?populate=*`, { headers });
		if (response.status === 200) {
			return { success: true, attributes: response.data.attributes };
		} else {
			console.error('Fehler beim Abrufen der Bestelldetails');
		}
	} catch (error) {
		console.error('Fehler beim Abrufen der Bestelldetails:', error);
	}
}