import {
    Controller,
    Get,
    Post,
    UseGuards,
    Req,
    Query,
    Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { UsersService } from '../services/users.service';
import { Request } from 'express';
import { AddressService } from '../services/address.service';
import { FollowsService } from '../services/follows.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(
        private userService: UsersService,
        private addressService: AddressService,
        private followService: FollowsService,
    ) {}

    @Post(':id')
    async getUserData(@Param('id') id: string) {
        console.log(id)
        const userData = await this.userService.findOne(id);
        const addreses = await this.addressService.findAllAddressUser(id);
        const myFollows = await this.followService.getFollows(id);
        const myFollowers = await this.followService.getFollowers(id);
        console.log(myFollowers);
        return {
            ...userData,
            addreses: addreses,
            follows: myFollows?.length ?? 0,
            followers: myFollowers?.length ?? 0,
        };
    }

    @UseGuards(JwtAuthGuard)
    @Get('/me')
    async getProfile(@Req() req: Request) {
        console.log(req.user['userId']);
        return this.userService.findOne(req.user['userId']);
    }

    @Get('/workers')
    async getDesigners(@Query('limit') limit = 4, @Query('skip') skip = 0) {
        return this.userService.findAllWorkers(limit, skip);
    }
}
