import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { CardsService } from 'src/users/services/cards.service';
import { Request } from 'express';
import { CreateCardDto } from 'src/users/dtos/card.dtos';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('cards')
@Controller('cards')
export class CardsController {
    constructor(private cardService: CardsService) {}

    @UseGuards(JwtAuthGuard)
    @Post('/mycards')
    async getCards(@Req() req: Request) {
        console.log('hola');
        return this.cardService.getMyCards(req.user['userId']);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/addCard')
    async addCard(@Req() req: Request, @Body() card: CreateCardDto) {
        return this.cardService.validateClient(req.user['userId'], card);
    }
}
