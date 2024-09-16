export default defineAppConfig({
    pagination: {
        defaultPageSize: 25,
    },
    tairo: {
        collapse: {
            circularMenu: {
                enabled: false,
                tools: [],
            },
            toolbar: {
                enabled: true,
                showTitle: true,
                showNavBurger: true,
                tools: [],
            },
            navigation: {
                enabled: true,
                items: [
                    {
                        name: 'Divider',
                        divider: true,
                    },
                    {
                        name: 'Выйти',
                        icon: {name: 'ph:sign-out', class: 'w-5 h-5'},
                        to: '/logout'
                    },
                ],
            },
        },
    }
});
