import type {
    DehydratedState,
    VueQueryPluginOptions,
} from '@tanstack/vue-query';
import {
    dehydrate,
    hydrate,
    VueQueryPlugin,
} from '@tanstack/vue-query';

import { useState } from '#app';
import { queryClient } from '~/utils';

export default defineNuxtPlugin((nuxt) => {
    const vueQueryState = useState<DehydratedState | null>('vue-query');


    const options: VueQueryPluginOptions = { queryClient };

    nuxt.vueApp.use(VueQueryPlugin, options);

    if (process.server) {
        nuxt.hooks.hook('app:rendered', () => {
            vueQueryState.value = dehydrate(queryClient);
        });
    }

    if (process.client) {
        nuxt.hooks.hook('app:created', () => {
            hydrate(queryClient, vueQueryState.value);
        });
    }
});