import {
    Injectable,
    UnauthorizedException,
    HttpException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'email',
            passwordField: 'password',
        });
    }

    async validate(email: string, password: string): Promise<any> {
        console.log(email);
        try {
            const user = await this.authService.validateUser(email, password);
            if (!user) {
                return new UnauthorizedException('No user found credentials');
            }
            return user;
        } catch (e) {
            throw new HttpException(e.message, e.status);
        }
    }
}
