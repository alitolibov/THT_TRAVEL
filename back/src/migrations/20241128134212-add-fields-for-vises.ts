'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('Visas', 'locationUz', {
            type: Sequelize.STRING,
        });

        await queryInterface.addColumn('Visas', 'locationEn', {
            type: Sequelize.STRING,
        });

        await queryInterface.renameColumn('Visas', 'location', 'locationRu');
    },

    async down(queryInterface) {
        await queryInterface.removeColumn('Visas', 'locationUz');

        await queryInterface.removeColumn('Visas', 'locationEn');

        await queryInterface.renameColumn('Visas', 'locationRu', 'location');
    },
};
