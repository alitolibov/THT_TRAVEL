'use strict';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const bcrypt = require('bcrypt');

/** @type {import("sequelize-cli").Migration} */
module.exports = {
    async up(queryInterface) {
        const hashedPassword = await bcrypt.hash(process.env.USER_PASSWORD, 10);

        return queryInterface.bulkInsert('Users', [
            {
                firstName: 'Khasan',
                lastName: 'Tagiev',
                email: process.env.USER_EMAIL,
                password: hashedPassword,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('Users', null, {});
    },
};
