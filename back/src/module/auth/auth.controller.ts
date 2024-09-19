import {Body, Controller, Post} from '@nestjs/common';
import {UserCreateDTO} from "../users/dto";
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('sign-up')
     createUser(@Body() body: UserCreateDTO) {
        return this.authService.signUp(body);
    }
}
