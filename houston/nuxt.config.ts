import colors from 'tailwindcss/colors';

export default defineNuxtConfig({
    ssr: false,
    app: {
        head: {
            title: 'Houston',
            titleTemplate: '%s - Houston',
            meta: [
                {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            ],
            link: [{rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}],
        },
        pageTransition: {
            enterActiveClass: 'transition-opacity duration-200 ease-out',
            enterFromClass: 'opacity-0',
            enterToClass: 'opacity-100',
            leaveActiveClass: 'transition-opacity duration-75 ease-in',
            leaveFromClass: 'opacity-100',
            leaveToClass: 'opacity-0'
        },
    },
    extends: [
        '@shuriken-ui/nuxt',
    ],
    components: {
        dirs: []
    },
    runtimeConfig: {
        public: {
            apiUrl: 'http://192.168.110.91:3030/'
        }
    },
    plugins: [],
    css: [],
    modules: [
        '@pinia/nuxt',
        '@nuxtjs/tailwindcss',
    ],
    tailwindcss: {
        exposeConfig: true,
        config: {
            theme: {
                container: {center: true},
                extend: {
                    colors: {
                        ...colors,
                        primary: {
                            200: '#0033ff',
                            300: '#0029e0',
                            400: '#0021bf',
                            500: '#001aa0',
                            600: '#001893',
                            700: '#001686',
                            800: '#001479',
                        }
                    }
                }
            }
        }
    },
    typescript: {
        typeCheck: false
    }
});
