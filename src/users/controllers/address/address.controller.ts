import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { CreateAddressDto } from 'src/users/dtos/address.dtos';
import { AddressService } from 'src/users/services/address.service';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('address')
@Controller('address')
export class AddressController {
    constructor(private addressService: AddressService) {}

    @UseGuards(JwtAuthGuard)
    @Get('')
    async findMyAddress(@Req() req: Request) {
        return this.addressService.findAllAddressUser(req.user['userId']);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/create')
    async createAddress(
        @Req() req: Request,
        @Body() address: CreateAddressDto,
    ) {
        return this.addressService.createAddress(address, req.user['userId']);
    }
}
