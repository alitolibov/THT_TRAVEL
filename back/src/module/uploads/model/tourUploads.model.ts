import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';

import { Tour } from '../../tours/model/tours.model';
import { Upload } from './upload.model';

@Table
export class TourUploads extends Model {
    @ForeignKey(() => Tour)
    @Column
    tourId: number;

    @ForeignKey(() => Upload)
    @Column
    uploadId: number;
}
