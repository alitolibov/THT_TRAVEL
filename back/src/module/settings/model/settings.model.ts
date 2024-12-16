import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Settings extends Model {
    @Column
    aboutUsRu: string;

    @Column
    aboutUsUz: string;

    @Column
    aboutUsEn: string;

    @Column
    yearInTourism: number;

    @Column
    readyTours: number;

    @Column
    clients: number;

    @Column
    sales: number;

    @Column
    phoneFirst: string;

    @Column
    phoneSecond: string;

    @Column
    instagram: string;

    @Column
    telegram: string;

    @Column
    mail: string;
}
