import { HttpException, Injectable } from '@nestjs/common';
import { OpenpayService } from 'src/openpay/services/openpay.service';
import { CreateCardDto } from '../dtos/card.dtos';

@Injectable()
export class CardsService {
    constructor(private openpayService: OpenpayService) {}

    async validateClient(ownerId: string, create: CreateCardDto) {
        try {
            const clientId = await this.openpayService.validateClient(ownerId);
            const card = await this.openpayService.createCard(
                clientId['id'],
                create,
            );
            return card;
        } catch (error) {
            console.log(`Im Error: ${error['http_code']}`);
            throw new HttpException(error, error['http_code']);
        }
    }

    async getMyCards(ownerId: string) {
        try {
            const clientId = await this.openpayService.validateClient(ownerId);
            return this.openpayService.findCards(clientId['id']);
        } catch (error) {
            throw new HttpException(error, error['http_code']);
        }
    }
}
