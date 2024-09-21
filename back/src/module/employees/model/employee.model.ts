import {Column, Model, Table} from "sequelize-typescript";

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
    telegram: string
}