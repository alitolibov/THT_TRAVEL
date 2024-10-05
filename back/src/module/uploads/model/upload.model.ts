import {
    BelongsTo,
    Column,
    ForeignKey,
    HasOne,
    Model,
    Table,
} from 'sequelize-typescript';
import { Employee } from '../../employees/model/employee.model';
import { Tour } from '../../tours/model/tours.model';

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

    @ForeignKey(() => Tour)
    @Column
    tourId: number;

    @BelongsTo(() => Tour)
    tour: Tour;
}
