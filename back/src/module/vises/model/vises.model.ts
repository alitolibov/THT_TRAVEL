import {
    BelongsTo,
    Column,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript';

import { Upload } from '../../uploads/model/upload.model';

@Table
export class Visa extends Model {
    @Column
    nameVisaUz: string;

    @Column
    nameVisaRu: string;

    @Column
    nameVisaEn: string;

    @Column
    reviewPeriods: number;

    @Column
    descriptionUz: string;

    @Column
    descriptionRu: string;

    @Column
    descriptionEn: string;

    @Column
    locationUz: string;

    @Column
    locationRu: string;

    @Column
    locationEn: string;

    @BelongsTo(() => Upload)
    image: Upload;

    @ForeignKey(() => Upload)
    @Column
    imageId: number;
}
