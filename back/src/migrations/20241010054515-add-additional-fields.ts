'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.renameColumn(
            'Tours',
            'nameDirection',
            'nameDirectionRu',
        );

        await queryInterface.addColumn('Tours', 'nameDirectionUz', {
            type: Sequelize.STRING,
        });

        await queryInterface.addColumn('Tours', 'nameDirectionEn', {
            type: Sequelize.STRING,
        });

        await queryInterface.renameColumn(
            'Tours',
            'description',
            'descriptionRu',
        );

        await queryInterface.addColumn('Tours', 'descriptionUz', {
            type: Sequelize.STRING,
        });

        await queryInterface.addColumn('Tours', 'descriptionEn', {
            type: Sequelize.STRING,
        });

        await queryInterface.renameColumn('CategoryTours', 'name', 'nameRu');

        await queryInterface.addColumn('CategoryTours', 'nameUz', {
            type: Sequelize.STRING,
        });

        await queryInterface.addColumn('CategoryTours', 'nameEn', {
            type: Sequelize.STRING,
        });
    },

    async down(queryInterface) {
        await queryInterface.removeColumn('Tours', 'descriptionEn');
        await queryInterface.removeColumn('Tours', 'descriptionUz');
        await queryInterface.removeColumn('Tours', 'nameDirectionEn');
        await queryInterface.removeColumn('Tours', 'nameDirectionUz');
        await queryInterface.removeColumn('CategoryTours', 'nameUz');
        await queryInterface.removeColumn('CategoryTours', 'nameEn');

        await queryInterface.renameColumn(
            'Tours',
            'descriptionRu',
            'description',
        );
        await queryInterface.renameColumn(
            'Tours',
            'nameDirectionRu',
            'nameDirection',
        );
        await queryInterface.renameColumn('CategoryTours', 'nameRu', 'name');
    },
};
