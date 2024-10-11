import {
    BelongsToMany,
    Column,
    HasOne,
    Model,
    Table,
} from 'sequelize-typescript';

import { Employee } from '../../employees/model/employee.model';
import { Tour } from '../../tours/model/tours.model';
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

    @BelongsToMany(() => Tour, () => TourUploads)
    tours: Tour[];
}
