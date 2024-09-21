import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./model/user.model";
import { UserCreateDTO } from "./dto";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userRepository: typeof User) {}

  async createUser(dto: UserCreateDTO): Promise<UserCreateDTO> {
    return this.userRepository.create({
      firstName: dto.firstName,
      lastName: dto.lastName,
      password: dto.password,
      email: dto.email
    });
  }

   findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  getUsers() {
    return this.userRepository.findAll();
  }
}
