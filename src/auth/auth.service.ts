import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { Client } from 'pg';
import { CreateUserDto } from 'src/users/dtos/user.dto';
import * as bcrypt from 'bcrypt';
import { CloudinaryService } from 'src/cloudinary/services/cloudinary.service';

@Injectable()
export class AuthService {
    constructor(
        @Inject('DATABASE_CONNECTION') private clientpg: Client,
        private usersService: UsersService,
        private jwtService: JwtService,
        private cloudService: CloudinaryService,
    ) {}

    async validateUser(email: string, pass: string): Promise<any> {
        console.log(email);
        const user = await this.usersService.findByEmail(email);
        if (user) {
            const isMatch = await bcrypt.compare(pass, user.password);
            if (isMatch) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { password, ...result } = user;
                // console.log(result);
                return result;
            } else {
                throw new UnauthorizedException('Contraseña no válida');
            }
        } else {
            throw new UnauthorizedException(
                'No se encontró un usuario con este email',
            );
        }
    }

    async login(user: any) {
        console.log(user);

        const payload = { username: user.role, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async loginSocial(userData: CreateUserDto) {
        return this.usersService
            .findOne(userData.id)
            .then((user) => {
                if (user) {
                    const payload = { username: user.role, sub: user.id };
                    return {
                        access_token: this.jwtService.sign(payload),
                    };
                } else {
                    return this.registerUserSocial(userData);
                }
            })
            .catch((err) => {
                if (err.status === 404) {
                    return this.registerUserSocial(userData);
                }
                console.log('coltala', err.status);
            });
    }

    async registerUserSocial(userData: CreateUserDto) {
        const userRegister = await this.usersService.createOfSocial(userData);
        const payload = { username: userRegister.role, sub: userRegister.id };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async registerUser(userData: CreateUserDto) {
        
        const userRegister = await this.usersService.create(userData);
        const payload = { username: userRegister.role, sub: userRegister.id };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async querySelect() {
        const result = await this.clientpg.query('SELECT * FROM users');
        return result.rows;
    }
}
