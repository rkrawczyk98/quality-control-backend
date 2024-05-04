import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1714817879240 implements MigrationInterface {
    name = 'Initial1714817879240'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "permission" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "creationDate" TIMESTAMP NOT NULL DEFAULT now(), "lastModified" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_240853a0c3353c25fb12434ad33" UNIQUE ("name"), CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_240853a0c3353c25fb12434ad3" ON "permission" ("name") `);
        await queryRunner.query(`CREATE TABLE "role_permission" ("id" SERIAL NOT NULL, "permissionId" integer NOT NULL, "roleId" integer NOT NULL, "creationDate" TIMESTAMP NOT NULL DEFAULT now(), "lastModified" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_96c8f1fd25538d3692024115b47" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_72e80be86cab0e93e67ed1a7a9" ON "role_permission" ("permissionId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e3130a39c1e4a740d044e68573" ON "role_permission" ("roleId") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_b42bbacb8402c353df82243254" ON "role_permission" ("permissionId", "roleId") `);
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "creationDate" TIMESTAMP NOT NULL DEFAULT now(), "lastModified" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ae4578dcaed5adff96595e6166" ON "role" ("name") `);
        await queryRunner.query(`CREATE TABLE "user_role" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "roleId" integer NOT NULL, "creationDate" TIMESTAMP NOT NULL DEFAULT now(), "lastModified" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_fb2e442d14add3cefbdf33c4561" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ab40a6f0cd7d3ebfcce082131f" ON "user_role" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_dba55ed826ef26b5b22bd39409" ON "user_role" ("roleId") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_7b4e17a669299579dfa55a3fc3" ON "user_role" ("userId", "roleId") `);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "creationDate" TIMESTAMP NOT NULL DEFAULT now(), "lastModified" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_78a916df40e02a9deb1c4b75ed" ON "user" ("username") `);
        await queryRunner.query(`ALTER TABLE "role_permission" ADD CONSTRAINT "FK_e3130a39c1e4a740d044e685730" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_permission" ADD CONSTRAINT "FK_72e80be86cab0e93e67ed1a7a9a" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_role" ADD CONSTRAINT "FK_ab40a6f0cd7d3ebfcce082131fd" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_role" ADD CONSTRAINT "FK_dba55ed826ef26b5b22bd39409b" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_role" DROP CONSTRAINT "FK_dba55ed826ef26b5b22bd39409b"`);
        await queryRunner.query(`ALTER TABLE "user_role" DROP CONSTRAINT "FK_ab40a6f0cd7d3ebfcce082131fd"`);
        await queryRunner.query(`ALTER TABLE "role_permission" DROP CONSTRAINT "FK_72e80be86cab0e93e67ed1a7a9a"`);
        await queryRunner.query(`ALTER TABLE "role_permission" DROP CONSTRAINT "FK_e3130a39c1e4a740d044e685730"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_78a916df40e02a9deb1c4b75ed"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7b4e17a669299579dfa55a3fc3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dba55ed826ef26b5b22bd39409"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ab40a6f0cd7d3ebfcce082131f"`);
        await queryRunner.query(`DROP TABLE "user_role"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ae4578dcaed5adff96595e6166"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b42bbacb8402c353df82243254"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e3130a39c1e4a740d044e68573"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_72e80be86cab0e93e67ed1a7a9"`);
        await queryRunner.query(`DROP TABLE "role_permission"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_240853a0c3353c25fb12434ad3"`);
        await queryRunner.query(`DROP TABLE "permission"`);
    }

}
