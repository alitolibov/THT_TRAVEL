import {ConflictException, Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import {IJwtPayload} from '../../types';
import { UsersService } from '../users/users.service';
import {SignInDTO, SignUpDTO} from './dto';

@Injectable()
export class AuthService {
  constructor(
      private readonly userService: UsersService,
      private readonly jwtService: JwtService
  ) {}

  private async generateHashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  private async isValidPassword(password: string, hashPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword);
  }

  private async generateToken(payload: IJwtPayload) {
    return this.jwtService.signAsync(payload);
  }

  async signUp(userDTO: SignUpDTO) {
    const user = await this.userService.findByEmail(userDTO.email);

    if(user) {
      throw new ConflictException('User already exists');
    }

    await this.userService.createUser({
      ...userDTO,
      password: await this.generateHashPassword(userDTO.password)
    });

    return 'Created';
  }

  async signIn(signInDTO: SignInDTO){
    const user = await this.userService.findByEmail(signInDTO.email);

    if(!user || !(await this.isValidPassword(signInDTO.password, user.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return {
      access_token: await this.generateToken({id:user.id, email: user.email})
    };
  }

  async getUsers() {
    return this.userService.getUsers();
  }
}
