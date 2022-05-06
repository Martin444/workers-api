import { IsNumber, IsString } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {
    @IsString()
    @ApiProperty({ description: 'pais' })
    readonly country: string;

    @IsString()
    @ApiProperty({ description: 'ciudad' })
    readonly city: string;

    @IsString()
    @ApiProperty({ description: 'Postal code' })
    readonly cpcode: number;

    @IsString()
    @ApiProperty({ description: 'Address' })
    readonly address1: string;

    @IsNumber()
    @ApiProperty({ description: 'Address' })
    readonly lat: number;

    @IsNumber()
    @ApiProperty({ description: 'Address' })
    readonly long: number;
}

export class UpdateCardDto extends PartialType(CreateAddressDto) {}
