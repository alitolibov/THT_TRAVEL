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
                        name: 'Туры',
                        icon: {name: 'ph:airplane', class: 'w-5 h-5'},
                        to: '/tours'
                    },
                    {
                        name: 'Категория туров',
                        icon: {name: 'ph:sort-ascending', class: 'w-5 h-5'},
                        to: '/category'
                    },
                    {
                        name: 'Сотрудники',
                        icon: {name: 'ph:users', class: 'w-5 h-5'},
                        to: '/employees'
                    },
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
