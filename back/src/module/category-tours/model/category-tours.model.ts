import { Column, HasMany, Model, Table } from 'sequelize-typescript';

import { Tour } from '../../tours/model/tours.model';

@Table
export class CategoryTours extends Model {
    @Column
    nameRu: string;

    @Column
    nameUz: string;

    @Column
    nameEn: string;

    @Column
    priority: number;

    @HasMany(() => Tour)
    tours: Tour[];
}
