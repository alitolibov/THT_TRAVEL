import {ConflictException, Injectable} from '@nestjs/common';
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcrypt"
import {SignUpDTO} from "./dto";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  private async generateHashPassword(password: string): Promise<string> {
    const salt = 10;
    return await bcrypt.hash(password, salt);
  }

  async signUp(userDTO: SignUpDTO) {
    const user = await this.userService.findByEmail(userDTO.email);

    if(user) {
      throw new ConflictException('User already exists');
    }

    await this.userService.createUser({
      ...userDTO,
      password: await this.generateHashPassword(userDTO.password)
    })

    return 'Created'
  }

}
