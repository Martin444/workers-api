import {MigrationInterface, QueryRunner} from "typeorm";

export class chater1647302261926 implements MigrationInterface {
    name = 'chater1647302261926'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "messages" ("id" character varying NOT NULL, "authorId" character varying(255) NOT NULL, "receiveId" character varying NOT NULL, "message" character varying(255) NOT NULL, "chatID" character varying(255) NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "messages"`);
    }

}
