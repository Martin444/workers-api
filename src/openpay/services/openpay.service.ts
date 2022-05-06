import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Openpay from 'openpay';
import { CreateCardDto } from 'src/users/dtos/card.dtos';
import { UsersService } from 'src/users/services/users.service';
import { Repository } from 'typeorm';
import { Card } from '../entities/card.entity';
import { Client } from '../entities/client.entity';
import { Transaction } from '../entities/transaction.entity';
@Injectable()
export class OpenpayService {
    constructor(
        @Inject('OPENPAY_CONNECTION') private openCli: Openpay,
        @InjectRepository(Client) private clientRepo: Repository<Client>,
        @InjectRepository(Card) private cardRepo: Repository<Card>,
        @InjectRepository(Transaction)
        private transRepo: Repository<Transaction>,
        private userService: UsersService,
    ) {}

    async validateClient(ownerId: string) {
        const clientId = await this.clientRepo.findOne({
            where: { ownerId: ownerId },
        });

        if (!clientId) {
            const userD = await this.userService.findOne(ownerId);
            const customerRequest = {
                name: userD.name,
                email: userD.email,
                requires_account: false,
            };

            const newClient = await this.createNewCustomer(
                customerRequest,
                ownerId,
            );
            return newClient;
        }
        return clientId;
    }

    async createNewCustomer(customer: any, owner: string): Promise<Client> {
        return new Promise((resolve, reject) => {
            this.openCli.customers.create(customer, (err, res) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                const thisclient = new Client();
                thisclient.id = res.id;
                thisclient.name = res.name;
                thisclient.email = res.email;
                thisclient.creation_date = res.creation_date;
                thisclient.ownerId = owner;
                thisclient.status = 'created';
                thisclient.clabe = '';
                const creatCli = this.clientRepo.create(thisclient);
                resolve(this.clientRepo.save(creatCli));
            });
        });
    }

    async createCard(clientId: string, card: CreateCardDto) {
        return new Promise((resolve, reject) => {
            this.openCli.customers.cards.create(
                clientId,
                {
                    token_id: card.token,
                    device_session_id: card.device_session_id,
                },
                (err, res) => {
                    if (err) {
                        reject(err);
                    }
                    try {
                        const thiscard = new Card();
                        if (res != null) {
                            thiscard.id = res.id;
                            thiscard.card_number = res.card_number;
                            thiscard.expiration_month = res.expiration_month;
                            thiscard.expiration_year = res.expiration_year;
                            thiscard.holder_name = res.holder_name;
                            thiscard.bank_name = res.bank_name;
                            thiscard.bank_code = res.bank_code;
                            thiscard.type = res.type;
                            thiscard.brand = res.brand;
                            thiscard.customer_id = res.customer_id;
                            const creatCard = this.cardRepo.create(thiscard);
                            resolve(this.cardRepo.save(creatCard));
                        }
                    } catch (error) {
                        console.log(error);
                    }
                },
            );
        });
    }

    async findCards(clientId: string) {
        return this.cardRepo.find({ where: { customer_id: clientId } });
    }

    async findOneCard(id: string) {
        return this.cardRepo.findOne(id);
    }

    // async createCharge(clientID: Client, cardid: string, order: Orders) {
    //     try {
    //         const chargeRequest = {
    //             source_id: cardid,
    //             method: 'card',
    //             amount: order.amount,
    //             currency: 'MXN',
    //             description: order.description,
    //             // cvv2: '123',
    //             // order_id: 'oid-00051',
    //             device_session_id: order.device_session_id,
    //         };
    //         const newCharge = await this.chargeWithId(clientID, chargeRequest);

    //         const newTransaction = new Transaction();
    //         newTransaction.id = newCharge['id'];
    //         newTransaction.amount = newCharge['amount'];
    //         newTransaction.client_id = newCharge['customer_id'];
    //         newTransaction.description = newCharge['description'];
    //         newTransaction.transaction_type = newCharge['transaction_type'];
    //         newTransaction.method = newCharge['method'];
    //         newTransaction.creation_date = newCharge['creation_date'];
    //         if (order.delivery_type == 'estafeta') {
    //             newTransaction.descont =
    //                 newCharge['fee']['amount'] + newCharge['fee']['tax'] + 80;
    //         } else {
    //             newTransaction.descont = Math.round(
    //                 newCharge['fee']['amount'] + newCharge['fee']['tax'],
    //             );
    //         }
    //         newTransaction.status = newCharge['status'];
    //         console.log(`Soy la transactione ${newTransaction.descont}`);
    //         return this.transRepo.save(newTransaction);
    //     } catch (error) {
    //         console.log(error);
    //         throw new HttpException(error, 402);
    //     }
    // }

    // async createChargeSpotlight(
    //     clientID: Client,
    //     cardid: string,
    //     spot: Spotlight,
    // ) {
    //     try {
    //         const chargeRequest = {
    //             source_id: cardid,
    //             method: 'card',
    //             amount: spot.amount,
    //             currency: 'MXN',
    //             description: spot.description,
    //             // cvv2: '123',
    //             // order_id: 'oid-00051',
    //             device_session_id: spot.device_session_id,
    //         };
    //         const newCharge = await this.chargeWithId(clientID, chargeRequest);

    //         const newTransaction = new Transaction();
    //         newTransaction.id = newCharge['id'];
    //         newTransaction.amount = newCharge['amount'];
    //         newTransaction.client_id = newCharge['customer_id'];
    //         newTransaction.description = newCharge['description'];
    //         newTransaction.transaction_type = newCharge['transaction_type'];
    //         newTransaction.method = newCharge['method'];
    //         newTransaction.creation_date = newCharge['creation_date'];
    //         newTransaction.descont = 0;
    //         newTransaction.status = newCharge['status'];
    //         return newTransaction;
    //     } catch (error) {
    //         console.log(error);
    //         throw new HttpException(error, 402);
    //     }
    // }

    async chargeWithId(clientID: Client, recues: any) {
        return new Promise((resolve, reject) => {
            this.openCli.customers.charges.create(
                clientID.id,
                recues,
                (err, res) => {
                    if (err) {
                        // console.log(err);
                        reject(err);
                    }
                    // console.log(res);
                    resolve(res);
                },
            );
        });
    }
}
