import { writable } from 'svelte/store';

export const auth = writable({
	id: null,
	alias: null
});
