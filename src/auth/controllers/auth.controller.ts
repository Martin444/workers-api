import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Request } from 'express';
// import { JwtAuthGuard } from '../jwt.auth.guard';
// import { LocalAuthGuard } from '../local-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dtos/user.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('/login')
    async login(@Req() payload: Request) {
        return this.authService.login(payload.user);
    }

    // @UseGuards(LocalAuthGuard)
    @Post('/register')
    async register(@Body() payload: CreateUserDto) {
        return this.authService.registerUser(payload);
    }

    @Post('/social')
    async loginSocial(@Body() payload: CreateUserDto) {
        return this.authService.loginSocial(payload);
    }
}
