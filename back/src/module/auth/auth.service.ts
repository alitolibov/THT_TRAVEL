import { Injectable } from '@nestjs/common';
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  private async generateHashPassword(password: string): Promise<string> {
    const salt = 10;
    return await bcrypt.hash(password, salt);
  }
}
