import {
    BelongsToMany,
    Column,
    HasOne,
    Model,
    Table,
} from 'sequelize-typescript';

import { Employee } from '../../employees/model/employee.model';
import { Tour } from '../../tours/model/tours.model';
import { Visa } from '../../vises/model/vises.model';
import { TourUploads } from './tourUploads.model';

@Table
export class Upload extends Model {
    @Column
    filename: string;

    @Column
    originalname: string;

    @Column
    path: string;

    @Column
    size: number;

    @HasOne(() => Employee)
    employee: Employee;

    @HasOne(() => Visa)
    visa: Visa;

    @BelongsToMany(() => Tour, () => TourUploads)
    tours: Tour[];
}
