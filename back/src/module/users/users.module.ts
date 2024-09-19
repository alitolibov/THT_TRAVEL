import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./model/user.model";

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
