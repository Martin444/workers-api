import { Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { FollowsService } from 'src/users/services/follows.service';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('follows')
@Controller('follow')
export class FollowController {
    constructor(private followService: FollowsService) {}

    @UseGuards(JwtAuthGuard)
    @Post(':id/addFollow')
    async addFollow(@Param('id') id: string, @Req() userData: Request) {
        return this.followService.followValidate(id, userData.user['userId']);
    }

    @UseGuards(JwtAuthGuard)
    @Post('getMeFollow')
    async getMeFollow(@Req() userData: Request) {
        return this.followService.getProfilesFollowed(userData.user['userId']);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/follows')
    async removeFollow(@Req() userData: Request) {
        return this.followService.getFollows(userData.user['userId']);
    }
}
