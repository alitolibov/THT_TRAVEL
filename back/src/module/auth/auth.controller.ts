import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {UserCreateDTO} from "../users/dto";
import {AuthService} from "./auth.service";
import {SignInDTO} from "./dto";
import {JwtGuards} from "./guards/jwt.guards";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('sign-up')
     signUp(@Body() body: UserCreateDTO) {
        return this.authService.signUp(body);
    }

    @Post('sign-in')
    signIn(@Body() body: SignInDTO) {
        return this.authService.signIn(body);
    }

    @Get()
    @UseGuards(JwtGuards)
    getUsers() {
        return this.authService.getUsers();
    }
}
