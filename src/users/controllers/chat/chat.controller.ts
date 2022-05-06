import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { CreateMessageDto } from 'src/users/dtos/message.dtos';
import { MessagesService } from 'src/users/services/messages.service';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
    constructor(private messageService: MessagesService) {}
    @UseGuards(JwtAuthGuard)
    @Get('/findWith/:id')
    async findChatWith(@Param('id') id: string, @Req() req: Request) {
        return this.messageService.findChatWithUser(req.user['userId'], id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/send')
    async createMessage(
        @Req() req: Request,
        @Body() message: CreateMessageDto,
    ) {
        return this.messageService.createNewMessage(
            req.user['userId'],
            message,
        );
    }
}
