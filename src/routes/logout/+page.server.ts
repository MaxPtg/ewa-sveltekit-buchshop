import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { invalidate } from '$app/navigation';
import { authStore } from '$lib/store';

export const actions: Actions = {
    default: async () => {
        authStore.set(null);
        return { success: true };
    }
};