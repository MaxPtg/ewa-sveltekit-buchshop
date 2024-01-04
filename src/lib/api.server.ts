import axios, {  AxiosError } from 'axios';
import { SECRET_STRAPI_API_TOKEN } from '$env/static/private';
import { log } from '$lib/util';


const baseURL: string = 'http://127.0.0.1:1337/api';

const headers = {
	Authorization: `Bearer ${SECRET_STRAPI_API_TOKEN}`,
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