import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../entitys/costumer.entity';

@Injectable()
export class CustomersService {
    constructor(
        @InjectRepository(Customer) private customRepo: Repository<Customer>,
    ) {}
    async findOne(id: number) {
        const user = await this.customRepo.findOne(id);
        if (!user) {
            throw new NotFoundException(`Customer #${id} not found`);
        }
        return user;
    }
}
