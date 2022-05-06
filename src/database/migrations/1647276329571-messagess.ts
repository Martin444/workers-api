import {MigrationInterface, QueryRunner} from "typeorm";

export class messagess1647276329571 implements MigrationInterface {
    name = 'messagess1647276329571'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "messages" ("id" character varying NOT NULL, "authorId" character varying(255) NOT NULL, "receiveId" integer NOT NULL, "message" character varying(255) NOT NULL, "type" character varying(100) NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "messages"`);
    }

}
