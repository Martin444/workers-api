import {MigrationInterface, QueryRunner} from "typeorm";

export class address1647131034369 implements MigrationInterface {
    name = 'address1647131034369'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id" character varying NOT NULL, "cpcode" integer NOT NULL, "address1" character varying(255) NOT NULL, "numRecide" integer NOT NULL, "description" character varying(255) NOT NULL, "ownerId" character varying(100) NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
