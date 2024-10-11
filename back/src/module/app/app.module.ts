import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { defaultConfiguration, jwtConfig, postgresConfig } from '../../config';
import { AuthModule } from '../auth/auth.module';
import { CategoryToursModule } from '../category-tours/category-tours.module';
import { CategoryTours } from '../category-tours/model/category-tours.model';
import { EmployeesModule } from '../employees/employees.module';
import { Employee } from '../employees/model/employee.model';
import { Tour } from '../tours/model/tours.model';
import { ToursModule } from '../tours/tours.module';
import { TourUploads } from '../uploads/model/tourUploads.model';
import { Upload } from '../uploads/model/upload.model';
import { UploadsModule } from '../uploads/uploads.module';
import { User } from '../users/model/user.model';
import { UsersModule } from '../users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [postgresConfig, jwtConfig, defaultConfiguration],
        }),
        SequelizeModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                dialect: 'postgres',
                host: configService.get('postgres.host'),
                port: configService.get('postgres.port'),
                username: configService.get('postgres.username'),
                password: configService.get('postgres.password'),
                database: configService.get('postgres.database'),
                synchronize: true,
                autoLoadModels: true,
                models: [
                    User,
                    Employee,
                    Upload,
                    Tour,
                    TourUploads,
                    CategoryTours,
                ],
            }),
        }),
        AuthModule,
        UsersModule,
        EmployeesModule,
        UploadsModule,
        ToursModule,
        CategoryToursModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
