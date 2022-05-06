import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAddressDto } from '../dtos/address.dtos';
import { Address } from '../entitys/address.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AddressService {
    constructor(
        @InjectRepository(Address) private addressRepo: Repository<Address>,
    ) {}

    async createAddress(ad: CreateAddressDto, ownerId: string) {
        const newAddress = this.addressRepo.create(ad);
        newAddress.id = uuidv4();
        newAddress.ownerId = ownerId;
        return this.addressRepo.save(newAddress);
    }

    findAllAddressUser(ownerId: string) {
        return this.addressRepo.find({ where: { ownerId } });
    }

    async updateAddress(id: string, ad: CreateAddressDto) {
        return this.addressRepo.update(id, ad);
    }

    async findOneAddress(id: string) {
        return this.addressRepo.findOne(id);
    }
}
