import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { User } from './entitys/user.entity';
import { Customer } from './entitys/costumer.entity';
import { CustomersService } from './services/customers.service';
import { Followers } from './entitys/followers.entity';
import { FollowsService } from './services/follows.service';
import { CardsService } from './services/cards.service';
import { Address } from './entitys/address.entity';
import { AddressService } from './services/address.service';
import { FollowController } from './controllers/follow/follow.controller';
import { CardsController } from './controllers/cards/cards.controller';
import { Messages } from './entitys/messages.entity';
import { MessagesService } from './services/messages.service';
import { ChatController } from './controllers/chat/chat.controller';
import { AddressController } from './controllers/address/address.controller';

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([
            User,
            Customer,
            Followers,
            Address,
            Messages,
        ]),
    ],
    providers: [
        UsersService,
        CustomersService,
        FollowsService,
        CardsService,
        AddressService,
        MessagesService,
    ],
    exports: [UsersService],
    controllers: [
        UsersController,
        FollowController,
        CardsController,
        ChatController,
        AddressController,
    ],
})
export class UsersModule {}
