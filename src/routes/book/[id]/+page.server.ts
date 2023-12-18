
import type { LayoutServerLoad } from './$types';

export const load = (async ({ params }) => {
    const bookId = params.id;
    console.log("bookId", bookId);
    return { success: true, bookId: bookId }
}) satisfies LayoutServerLoad;
