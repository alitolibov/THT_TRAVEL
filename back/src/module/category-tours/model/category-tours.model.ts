import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class CategoryTours extends Model {
    @Column
    name: string;

    @Column
    priority: number;
}
