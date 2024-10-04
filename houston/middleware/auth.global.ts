import {useLoggedIn} from '~/composables';

export default defineNuxtRouteMiddleware(async (to) => {
    if (!to.meta.authRoute)
        return;

    if (!useLoggedIn()) {
        return navigateTo('/login');
    }
});
