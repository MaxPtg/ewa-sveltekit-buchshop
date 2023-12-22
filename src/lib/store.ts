import { writable } from 'svelte/store';
import type { AuthenticatedUser } from './api.types';

export const authStore = writable<AuthenticatedUser | null>(null);
