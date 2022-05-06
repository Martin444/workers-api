import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto } from '../dtos/message.dtos';
import { Messages } from '../entitys/messages.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(Messages) private messageRepo: Repository<Messages>,
    ) {}
    async findChatWithUser(userSercher: string, userFinder: string) {
        const yousendme = await this.messageRepo.find({
            where: { authorId: userSercher, receiveId: userFinder },
        });
        if (yousendme.length != 0) {
            const list = await this.messageRepo.find({
                where: { chatID: yousendme[0].chatID },
            });
            return list;
        } else {
            const isendyou = await this.messageRepo.find({
                where: { authorId: userFinder, receiveId: userSercher },
            });
            if (isendyou.length != 0) {
                const list = await this.messageRepo.find({
                    where: { chatID: isendyou[0].chatID },
                });
                return list;
            } else {
                return [];
            }
        }
    }

    async createNewMessage(senderId: string, message: CreateMessageDto) {
        console.log(message.chatID);
        if (message.chatID != 'not found') {
            const newMessage = this.messageRepo.create(message);
            newMessage.authorId = senderId;
            newMessage.id = uuidv4();
            return this.messageRepo.save(newMessage);
        } else {
            const newMessage = this.messageRepo.create(message);
            newMessage.authorId = senderId;
            newMessage.id = uuidv4();
            newMessage.chatID = uuidv4();
            return this.messageRepo.save(newMessage);
        }
    }
}
