import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Tour } from '../../tours/model/tours.model';

@Table
export class CategoryTours extends Model {
    @Column
    name: string;

    @Column
    priority: number;

    @HasMany(() => Tour)
    tours: Tour[];
}
