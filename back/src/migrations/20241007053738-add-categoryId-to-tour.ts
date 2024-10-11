'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('Tours', 'categoryId', {
            type: Sequelize.INTEGER,
            references: {
                model: 'CategoryTours',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
            allowNull: true,
        });
    },

    async down(queryInterface) {
        await queryInterface.removeColumn('Tours', 'categoryId');
    },
};
