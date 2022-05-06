import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entitys/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import * as bcrypt from 'bcrypt';
import { CustomersService } from './customers.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
        private customerService: CustomersService,
    ) {}

    findAllWorkers(limit: number, skip: number) {
        return this.userRepo.find({
            where: { role: 'worker' },
            skip: skip,
            take: limit,
        });
    }

    async findOne(id: string) {
        const user = await this.userRepo.findOne(id);
        if (!user) {
            throw new NotFoundException(`User #${id} not found`);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;
        return result;
    }

    async userDetails() {
        return;
    }

    async createSocial(data: CreateUserDto) {
        const newUser = this.userRepo.create(data);
        console.log(newUser);
        const passhash = await bcrypt.hash(newUser.password, 10);
        newUser.password = passhash;
        newUser.id = uuidv4();
        if (data.customerId) {
            const customer = await this.customerService.findOne(
                data.customerId,
            );
            newUser.customer = customer;
        }

        return this.userRepo.save(newUser);
    }

    async create(data: CreateUserDto) {
        const newUser = this.userRepo.create(data);
        console.log(newUser);
        const passhash = await bcrypt.hash(newUser.password, 10);
        newUser.password = passhash;
        newUser.id = uuidv4();
        if (data.customerId) {
            const customer = await this.customerService.findOne(
                data.customerId,
            );
            newUser.customer = customer;
        }

        return this.userRepo.save(newUser);
    }

    async createOfSocial(data: CreateUserDto) {
        const newUser = this.userRepo.create(data);
        console.log(newUser);
        if (data.customerId) {
            const customer = await this.customerService.findOne(
                data.customerId,
            );
            newUser.customer = customer;
        }

        return this.userRepo.save(newUser);
    }

    async findByEmail(email: string) {
        console.log(email);
        return await this.userRepo.findOne({ where: { email: email } });
    }

    async update(id: number, changes: UpdateUserDto) {
        const user = await this.userRepo.findOne(id);
        this.userRepo.merge(user, changes);
        return this.userRepo.save(user);
    }

    remove(id: number) {
        return this.userRepo.delete(id);
    }
}
