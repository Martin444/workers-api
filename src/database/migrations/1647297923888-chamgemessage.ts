import {MigrationInterface, QueryRunner} from "typeorm";

export class chamgemessage1647297923888 implements MigrationInterface {
    name = 'chamgemessage1647297923888'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "receiveId"`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "receiveId" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "receiveId"`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "receiveId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "type" character varying(100) NOT NULL`);
    }

}
