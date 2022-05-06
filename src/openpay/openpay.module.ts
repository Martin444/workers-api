import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Openpay from 'openpay';
import config from 'src/config';
import { Card } from './entities/card.entity';
import { Client } from './entities/client.entity';
import { Transaction } from './entities/transaction.entity';
import { OpenpayService } from './services/openpay.service';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([Client, Card, Transaction])],
    providers: [
        {
            provide: 'OPENPAY_CONNECTION',
            useFactory: (configService: ConfigType<typeof config>) => {
                try {
                    const client = new Openpay(
                        configService.openpay.merchId,
                        configService.openpay.apikey,
                        false,
                    );
                    return client;
                } catch (error) {
                    console.log(`mi erri ${error}`);
                }
            },
            inject: [config.KEY],
        },
        OpenpayService,
    ],
    exports: [OpenpayService],
})
export class OpenpayModule {}
