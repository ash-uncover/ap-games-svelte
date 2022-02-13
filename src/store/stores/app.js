import { writable } from 'svelte/store'

import {
  APP_ROUTE,
} from 'util/routes.js'

function createApp() {
  const { subscribe, set, update } = writable({
    route: APP_ROUTE.HOME
  });

	return {
		subscribe,
		navigate: (route) => update(app => ({
      ...app,
      route
    }))
	}
}
export const APP = createApp()