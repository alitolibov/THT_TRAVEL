import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Upload } from '../../uploads/model/upload.model';

@Table
export class Tour extends Model {
    @Column
    nameDirection: string;

    @Column
    durationDays: number;

    @Column
    durationNights: number;

    @Column
    price: number;

    @Column
    description: string;

    @HasMany(() => Upload)
    images: Upload[];
}
