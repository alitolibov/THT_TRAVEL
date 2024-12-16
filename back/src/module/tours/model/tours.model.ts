import {
    BelongsTo,
    BelongsToMany,
    Column,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript';

import { CategoryTours } from '../../category-tours/model/category-tours.model';
import { TourUploads } from '../../uploads/model/tourUploads.model';
import { Upload } from '../../uploads/model/upload.model';

@Table
export class Tour extends Model {
    @Column
    nameDirectionRu: string;

    @Column
    nameDirectionUz: string;

    @Column
    nameDirectionEn: string;

    @Column
    durationDays: number;

    @Column
    durationNights: number;

    @Column
    price: number;

    @Column
    descriptionRu: string;

    @Column
    descriptionEn: string;

    @Column
    descriptionUz: string;

    @BelongsToMany(() => Upload, () => TourUploads)
    images: Upload[];

    @BelongsTo(() => CategoryTours)
    categoryTour: CategoryTours;

    @ForeignKey(() => CategoryTours)
    @Column
    categoryId: number;
}
