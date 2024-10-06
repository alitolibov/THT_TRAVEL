import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Upload } from './upload.model';
import { Tour } from '../../tours/model/tours.model';

@Table
export class TourUploads extends Model {
    @ForeignKey(() => Tour)
    @Column
    tourId: number;

    @ForeignKey(() => Upload)
    @Column
    uploadId: number;
}
