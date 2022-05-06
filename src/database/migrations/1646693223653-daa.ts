import {MigrationInterface, QueryRunner} from "typeorm";

export class daa1646693223653 implements MigrationInterface {
    name = 'daa1646693223653'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "brand" ("id" character varying NOT NULL, "nameBrand" character varying(255) NOT NULL, "photoUrl" character varying(255) NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_a5d20765ddd942eb5de4eee2d7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" character varying NOT NULL, "nameCategory" character varying(255) NOT NULL, "photoUrl" text NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "garment" ("id" text NOT NULL, "nameGarment" character varying(255) NOT NULL, "ownerCategory" character varying(255) NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_9a36c35a6a4c8c0b2897743038b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sub_garment" ("id" text NOT NULL, "nameGarment" character varying(255) NOT NULL, "ownerGarment" text NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_a7486f10a8a269c211887701a0a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "card" ("id" character varying NOT NULL, "card_number" character varying(255), "type" character varying(255) NOT NULL, "brand" character varying(255) NOT NULL, "holder_name" character varying(255) NOT NULL, "expiration_year" character varying(100) NOT NULL, "expiration_month" character varying(100) NOT NULL, "bank_name" character varying(100) NOT NULL, "bank_code" character varying(100) NOT NULL, "customer_id" character varying(100) NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_9451069b6f1199730791a7f4ae4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "client" ("id" character varying NOT NULL, "phone_number" character varying(255), "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "status" character varying(255) NOT NULL, "clabe" character varying(100) NOT NULL, "ownerId" character varying(100) NOT NULL, "creation_date" character varying(100) NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transaction" ("id" character varying NOT NULL, "amount" character varying(255), "method" character varying(255) NOT NULL, "transaction_type" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, "client_id" character varying(100) NOT NULL, "status" character varying(100) NOT NULL, "descont" integer NOT NULL, "creation_date" character varying(100) NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" character varying NOT NULL, "product_id" text NOT NULL, "delivery_type" text NOT NULL, "addres_id" text NOT NULL, "method_pay" text NOT NULL, "description" text NOT NULL, "device_session_id" text NOT NULL, "payment_id" text NOT NULL, "status" text NOT NULL, "state" text NOT NULL, "ownerId" text NOT NULL, "amount" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "likes" ("id" character varying NOT NULL, "ownerLiker" text NOT NULL, "likes" text array NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_a9323de3f8bced7539a794b4a37" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" character varying NOT NULL, "titleProduct" text NOT NULL, "price" integer NOT NULL, "description" text NOT NULL, "status" text NOT NULL, "state" text NOT NULL, "image" text array NOT NULL, "categoryId" text NOT NULL, "garmentId" text NOT NULL, "brandId" text NOT NULL, "wails" text NOT NULL, "ownerId" text NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "spotlight" ("id" character varying NOT NULL, "ownerId" character varying(255) NOT NULL, "spotlightProducts" text array NOT NULL, "expired" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_bafc41803e508da64ed687ed3b9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" character varying NOT NULL, "photoURL" character varying(255) NOT NULL, "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "role" character varying(100) NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "customerId" integer, CONSTRAINT "REL_6c687a8fa35b0ae35ce766b56c" UNIQUE ("customerId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "lastName" character varying(255) NOT NULL, "phone" character varying(255) NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "followers" ("id" character varying NOT NULL, "ownerProfile" text NOT NULL, "follows" text array NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_c90cfc5b18edd29bd15ba95c1a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_6c687a8fa35b0ae35ce766b56ce" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_6c687a8fa35b0ae35ce766b56ce"`);
        await queryRunner.query(`DROP TABLE "followers"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "spotlight"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "likes"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP TABLE "card"`);
        await queryRunner.query(`DROP TABLE "sub_garment"`);
        await queryRunner.query(`DROP TABLE "garment"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "brand"`);
    }

}
