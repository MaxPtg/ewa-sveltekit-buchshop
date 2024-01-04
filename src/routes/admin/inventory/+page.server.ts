import { getBooks, updateBookQuantity } from '$lib/api';
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    const books = await getBooks();
    return books;
}) satisfies PageServerLoad;

export const actions: Actions = {
    async updateBookQuantity({ params }) {
        await updateBookQuantity();
        return { status: 200 };
    }
} satisfies Actions;
