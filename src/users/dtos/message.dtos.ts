import { IsString } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
    @IsString()
    @ApiProperty({ description: 'sender' })
    readonly authorId: string;

    @IsString()
    @ApiProperty({ description: 'receiver' })
    readonly receiveId: string;

    @IsString()
    @ApiProperty({ description: 'message' })
    readonly message: string;

    @IsString()
    @ApiProperty({ description: 'chat id' })
    readonly chatID: string;
}

export class UpdateMessageDto extends PartialType(CreateMessageDto) {}
