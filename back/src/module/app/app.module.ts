import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { jwtConfig, postgresConfig } from "../../config";
import { User } from "../users/model/user.model";
import { UsersModule } from "../users/users.module";
import {AuthModule} from "../auth/auth.module";
import {EmployeesModule} from "../employees/employees.module";
import {Employee} from "../employees/model/employee.model";
import {UploadsModule} from "../uploads/uploads.module";
import {Upload} from "../uploads/model/upload.model";

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true,
    load: [postgresConfig, jwtConfig]
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
        models: [User, Employee, Upload]
      })
    }),
    AuthModule,
    UsersModule,
    EmployeesModule,
    UploadsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}