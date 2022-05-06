import { IsString } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateCardDto {
    @IsString()
    @ApiProperty({ description: 'token of card create in front' })
    readonly token: string;

    @IsString()
    @ApiProperty({ description: 'devicesessionID of device' })
    readonly device_session_id: string;
}

export class UpdateCardDto extends PartialType(CreateCardDto) {}
