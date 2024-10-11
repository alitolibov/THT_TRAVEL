import {BelongsTo, Column, ForeignKey, Model, Table} from 'sequelize-typescript';

import {Upload} from '../../uploads/model/upload.model';

@Table
export class Employee extends Model{
    @Column
    firstName: string;

    @Column
    lastName: string;

    @Column
    position: string;

    @Column
    phone: string;

    @Column
    instagram: string;

    @Column
    telegram: string;

    @ForeignKey(() => Upload)
    @Column
    imageId: number;

    @BelongsTo(() => Upload)
    image: Upload;
}