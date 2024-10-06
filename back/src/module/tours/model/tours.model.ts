import {
    BelongsToMany,
    Column,
    DataType,
    Model,
    Table,
} from 'sequelize-typescript';
import { Upload } from '../../uploads/model/upload.model';
import { TourUploads } from '../../uploads/model/tourUploads.model';

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

    @BelongsToMany(() => Upload, () => TourUploads)
    images: Upload[];
}
