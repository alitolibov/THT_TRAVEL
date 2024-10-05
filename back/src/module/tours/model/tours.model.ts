import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Tours extends Model {
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
}
