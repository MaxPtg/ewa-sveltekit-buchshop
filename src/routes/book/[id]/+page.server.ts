
import { getBook } from '$lib/api.server';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
    const bookId = parseInt(params.id);
    const book = await getBook(bookId);
    return { success: true, book }
}) satisfies PageServerLoad;
