import {Column, Model, Table} from "sequelize-typescript";

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
}