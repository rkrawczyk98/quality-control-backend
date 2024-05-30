import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingHistoryTablesForDeliveriesComponentAndComponentSubcomponent1717083962138 implements MigrationInterface {
    name = 'AddingHistoryTablesForDeliveriesComponentAndComponentSubcomponent1717083962138'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "component_subcomponent_history" ("id" SERIAL NOT NULL, "componentSubcomponentId" integer NOT NULL, "operationType" character varying NOT NULL, "operationTimestamp" TIMESTAMP NOT NULL DEFAULT now(), "modifiedByUserId" integer NOT NULL, "creationDate" TIMESTAMP NOT NULL DEFAULT now(), "lastModified" TIMESTAMP NOT NULL, "deletedAt" TIMESTAMP, "componentId" integer NOT NULL, "statusId" integer NOT NULL, "subcomponentId" integer NOT NULL, CONSTRAINT "PK_c10d9075be012ad155229593303" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_55b79a8ca8352b02cba9f470d7" ON "component_subcomponent_history" ("componentSubcomponentId") `);
        await queryRunner.query(`CREATE INDEX "IDX_1b634c8a0714e6b0cc8a285600" ON "component_subcomponent_history" ("componentId") `);
        await queryRunner.query(`CREATE INDEX "IDX_27d3b8410a21fad6cf825a7dfb" ON "component_subcomponent_history" ("subcomponentId") `);
        await queryRunner.query(`CREATE TABLE "component_history" ("id" SERIAL NOT NULL, "componentId" integer NOT NULL, "operationType" character varying NOT NULL, "operationTimestamp" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "size" double precision, "productionDate" TIMESTAMP, "controlDate" TIMESTAMP, "creationDate" TIMESTAMP NOT NULL, "lastModified" TIMESTAMP NOT NULL, "deletedAt" TIMESTAMP, "createdByUserId" integer NOT NULL, "modifiedByUserId" integer NOT NULL, "scrappedAt" TIMESTAMP, CONSTRAINT "PK_aafde35f7861905ae35e2da9103" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e9b9cef73c41cddbe8d01247ed" ON "component_history" ("componentId") `);
        await queryRunner.query(`CREATE INDEX "IDX_6270cb343b6879a1c804cac032" ON "component_history" ("operationType") `);
        await queryRunner.query(`CREATE INDEX "IDX_5250beb89ca625b159d9b0dc34" ON "component_history" ("name") `);
        await queryRunner.query(`CREATE TABLE "delivery_history" ("id" SERIAL NOT NULL, "deliveryId" integer NOT NULL, "operationType" character varying NOT NULL, "operationTimestamp" TIMESTAMP NOT NULL DEFAULT now(), "number" character varying NOT NULL, "createdByUserId" integer NOT NULL, "componentTypeId" integer NOT NULL, "creationDate" TIMESTAMP NOT NULL, "lastModified" TIMESTAMP NOT NULL, "deletedAt" TIMESTAMP, "statusId" integer, "customerId" integer, "deliveryDate" TIMESTAMP NOT NULL, CONSTRAINT "PK_b51c834c69b23c838f72729960c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f861ddddb7bb77328315e2bdc5" ON "delivery_history" ("number") `);
        await queryRunner.query(`CREATE INDEX "IDX_effaa56863c5011df6244cba7f" ON "delivery_history" ("componentTypeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_db0a522040aac43499c581f1e0" ON "delivery_history" ("customerId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_db0a522040aac43499c581f1e0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_effaa56863c5011df6244cba7f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f861ddddb7bb77328315e2bdc5"`);
        await queryRunner.query(`DROP TABLE "delivery_history"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5250beb89ca625b159d9b0dc34"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6270cb343b6879a1c804cac032"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e9b9cef73c41cddbe8d01247ed"`);
        await queryRunner.query(`DROP TABLE "component_history"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_27d3b8410a21fad6cf825a7dfb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1b634c8a0714e6b0cc8a285600"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_55b79a8ca8352b02cba9f470d7"`);
        await queryRunner.query(`DROP TABLE "component_subcomponent_history"`);
    }

}
