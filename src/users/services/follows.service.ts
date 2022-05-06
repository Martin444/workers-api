import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Followers } from '../entitys/followers.entity';
import { v4 as uuidv4 } from 'uuid';
import { UsersService } from './users.service';

@Injectable()
export class FollowsService {
    constructor(
        @InjectRepository(Followers) private followRepo: Repository<Followers>,
        private userServices: UsersService,
    ) {}

    async followValidate(followeId: string, ownerId: number) {
        const followed = await this.followRepo.find({
            where: { ownerProfile: ownerId },
        });
        if (followed.length == 0) {
            console.log(followed.length);
            const payload = new Followers();
            payload.id = uuidv4();
            payload.ownerProfile = ownerId.toString();
            payload.follows = [followeId.toString()];
            const newFollower = this.followRepo.create(payload);
            const response = await this.followRepo.save(newFollower);
            return response.follows;
        } else {
            const followin = this.addorRemoveLike(followed, followeId);
            return followin;
        }
    }

    async addorRemoveLike(follows: Followers[], productId: string) {
        for (let index = 0; index < follows.length; index++) {
            const e = follows[index];
            const verifyLike = e.follows.indexOf(productId.toString());
            if (verifyLike == -1) {
                e.follows.push(productId.toString());
                const response = await this.followRepo.save(e);
                return response.follows;
            } else {
                console.log(verifyLike);
                e.follows.splice(verifyLike, 1);
                const response = await this.followRepo.save(e);
                return response.follows;
            }
        }
        return;
    }

    //Trae los ids de los usuarios que sigue
    async getFollows(ownerId: string) {
        try {
            const followed = await this.followRepo.find({
                where: { ownerProfile: ownerId },
            });
            if (followed.length == 0) {
                return [];
            }
            return followed[0].follows;
        } catch (e) {
            throw new Error(e);
        }
    }
    // Trae info de los usuarios que sigue
    async getProfilesFollowed(ownerId: string) {
        let users = [];
        const listUsers = await this.getFollows(ownerId);
        for await (const iterator of listUsers) {
            const getUs = await this.userServices.findOne(iterator);
            users = [...users, getUs];
        }
        return users;
    }

    // Trae todos los seguidores de un usuario
    async getFollowers(ownerId: string) {
        let followers: any[];
        const follows = await this.followRepo.find();

        if (follows.length == 0) {
            return followers;
        }

        for (let foll = 0; foll < follows.length; foll++) {
            const element = follows[foll];
            const validate = element.follows.indexOf(ownerId);
            if (validate != -1) {
                if (followers != null) {
                    followers = [...followers, element.ownerProfile];
                } else {
                    followers = [element.ownerProfile];
                }
            } else {
                followers = [];
            }
        }
        return followers;
    }
}
