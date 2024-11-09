'use strict';

/** @type {import("sequelize-cli").Migration} */
module.exports = {
    async up(queryInterface) {
        return queryInterface.bulkInsert('Users', [
            {
                firstName: 'Khasan',
                lastName: 'Tagiev',
                email: process.env.USER_EMAIL,
                password: process.env.USER_PASSWORD,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('Users', null, {});
    },
};
