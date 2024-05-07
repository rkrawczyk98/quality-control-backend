import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingEntitiesForComponentCustomerDeliveryAndWarehouseModules1714826035091 implements MigrationInterface {
    name = 'AddingEntitiesForComponentCustomerDeliveryAndWarehouseModules1714826035091'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "component_status" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "creationDate" TIMESTAMP NOT NULL DEFAULT now(), "lastModified" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_67cd7093e77e29cbcf020578207" UNIQUE ("name"), CONSTRAINT "PK_c415d5980bb121c3f0edd72277b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subcomponent_status" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "creationDate" TIMESTAMP NOT NULL DEFAULT now(), "lastModified" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_3c32170e5a677c5b3e6341dcb7d" UNIQUE ("name"), CONSTRAINT "PK_e7f4ff36bca10d71c37e2f86b13" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "component_subcomponent" ("id" SERIAL NOT NULL, "modifiedByUserId" integer NOT NULL, "creationDate" TIMESTAMP NOT NULL DEFAULT now(), "lastModified" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "componentId" integer, "statusId" integer, "subcomponentId" integer, CONSTRAINT "PK_e67c3b610d64bcddf6515d98464" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subcomponent" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "creationDate" TIMESTAMP NOT NULL DEFAULT now(), "lastModified" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "componentTypeId" integer, CONSTRAINT "PK_e293bbd3147adaa69763b02b163" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "component_type" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "creationDate" TIMESTAMP NOT NULL DEFAULT now(), "lastModified" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_db09a641fd6c69dc73313903a48" UNIQUE ("name"), CONSTRAINT "PK_342675811724f592a8f57a6c6b9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "delivery_status" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "creationDate" TIMESTAMP NOT NULL DEFAULT now(), "lastModified" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_ab94c4c7f50d769a3931fb25f4a" UNIQUE ("name"), CONSTRAINT "PK_7402e08a6496ff740a56399e8b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "creationDate" TIMESTAMP NOT NULL DEFAULT now(), "lastModified" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_ac1455877a69957f7466d5dc78e" UNIQUE ("name"), CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ac1455877a69957f7466d5dc78" ON "customer" ("name") `);
        await queryRunner.query(`CREATE TABLE "delivery" ("id" SERIAL NOT NULL, "number" character varying NOT NULL, "createdByUserId" integer NOT NULL, "componentTypeId" integer NOT NULL, "deliveryDate" TIMESTAMP NOT NULL, "creationDate" TIMESTAMP NOT NULL DEFAULT now(), "lastModified" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "statusId" integer, "customerId" integer, CONSTRAINT "UQ_c711ec89a4f8dc39a831de43748" UNIQUE ("number"), CONSTRAINT "PK_ffad7bf84e68716cd9af89003b0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c711ec89a4f8dc39a831de4374" ON "delivery" ("number") `);
        await queryRunner.query(`CREATE INDEX "IDX_0a2bf2eb1ce10624f81dd35d0a" ON "delivery" ("deliveryDate") `);
        await queryRunner.query(`CREATE TABLE "warehouse_position" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "creationDate" TIMESTAMP NOT NULL DEFAULT now(), "lastModified" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "warehouseId" integer, CONSTRAINT "UQ_abb5eee17de28ab8bcc046c165e" UNIQUE ("name"), CONSTRAINT "PK_8519bce1936eec60b1846003311" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "warehouse" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "creationDate" TIMESTAMP NOT NULL DEFAULT now(), "lastModified" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_d5d5470e55d4238b1239e9f154b" UNIQUE ("name"), CONSTRAINT "PK_965abf9f99ae8c5983ae74ebde8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "component" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "size" double precision, "productionDate" TIMESTAMP, "controlDate" TIMESTAMP, "creationDate" TIMESTAMP NOT NULL DEFAULT now(), "lastModified" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdByUserId" integer NOT NULL, "modifiedByUserId" integer NOT NULL, "scrappedAt" TIMESTAMP, "componentTypeId" integer, "statusId" integer, "deliveryId" integer, "warehouseId" integer, "warehousePositionId" integer, CONSTRAINT "PK_c084eba2d3b157314de79135f09" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a60bfff7094fd0352057e8b44e" ON "component" ("name") `);
        await queryRunner.query(`ALTER TABLE "component_subcomponent" ADD CONSTRAINT "FK_b24869dc08bd8caaaf74bb1c6a6" FOREIGN KEY ("componentId") REFERENCES "component"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "component_subcomponent" ADD CONSTRAINT "FK_c663bcdda3c0c5f61d84675af17" FOREIGN KEY ("statusId") REFERENCES "subcomponent_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "component_subcomponent" ADD CONSTRAINT "FK_1a508be0056b6cb3cb4b28bd6f1" FOREIGN KEY ("subcomponentId") REFERENCES "subcomponent"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subcomponent" ADD CONSTRAINT "FK_13d60526886c712bb8c1061824c" FOREIGN KEY ("componentTypeId") REFERENCES "component_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "delivery" ADD CONSTRAINT "FK_d95cfaf929f94059f1d59ccdc9f" FOREIGN KEY ("statusId") REFERENCES "delivery_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "delivery" ADD CONSTRAINT "FK_263649c8697ffc70b85b11f0ebb" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "warehouse_position" ADD CONSTRAINT "FK_65d0664ed05cb64e10b069fd5b0" FOREIGN KEY ("warehouseId") REFERENCES "warehouse"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "component" ADD CONSTRAINT "FK_b6d0657dd99c4b093506444cbf7" FOREIGN KEY ("componentTypeId") REFERENCES "component_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "component" ADD CONSTRAINT "FK_e0eff417618df795cbaa14ee5fd" FOREIGN KEY ("statusId") REFERENCES "component_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "component" ADD CONSTRAINT "FK_b064c41e8a8347fab247fd88cba" FOREIGN KEY ("deliveryId") REFERENCES "delivery"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "component" ADD CONSTRAINT "FK_9e2bf4c5a52debf8d4d35022d08" FOREIGN KEY ("warehouseId") REFERENCES "warehouse"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "component" ADD CONSTRAINT "FK_c0b036e7bdb9ebfe53b46847474" FOREIGN KEY ("warehousePositionId") REFERENCES "warehouse_position"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "component" DROP CONSTRAINT "FK_c0b036e7bdb9ebfe53b46847474"`);
        await queryRunner.query(`ALTER TABLE "component" DROP CONSTRAINT "FK_9e2bf4c5a52debf8d4d35022d08"`);
        await queryRunner.query(`ALTER TABLE "component" DROP CONSTRAINT "FK_b064c41e8a8347fab247fd88cba"`);
        await queryRunner.query(`ALTER TABLE "component" DROP CONSTRAINT "FK_e0eff417618df795cbaa14ee5fd"`);
        await queryRunner.query(`ALTER TABLE "component" DROP CONSTRAINT "FK_b6d0657dd99c4b093506444cbf7"`);
        await queryRunner.query(`ALTER TABLE "warehouse_position" DROP CONSTRAINT "FK_65d0664ed05cb64e10b069fd5b0"`);
        await queryRunner.query(`ALTER TABLE "delivery" DROP CONSTRAINT "FK_263649c8697ffc70b85b11f0ebb"`);
        await queryRunner.query(`ALTER TABLE "delivery" DROP CONSTRAINT "FK_d95cfaf929f94059f1d59ccdc9f"`);
        await queryRunner.query(`ALTER TABLE "subcomponent" DROP CONSTRAINT "FK_13d60526886c712bb8c1061824c"`);
        await queryRunner.query(`ALTER TABLE "component_subcomponent" DROP CONSTRAINT "FK_1a508be0056b6cb3cb4b28bd6f1"`);
        await queryRunner.query(`ALTER TABLE "component_subcomponent" DROP CONSTRAINT "FK_c663bcdda3c0c5f61d84675af17"`);
        await queryRunner.query(`ALTER TABLE "component_subcomponent" DROP CONSTRAINT "FK_b24869dc08bd8caaaf74bb1c6a6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a60bfff7094fd0352057e8b44e"`);
        await queryRunner.query(`DROP TABLE "component"`);
        await queryRunner.query(`DROP TABLE "warehouse"`);
        await queryRunner.query(`DROP TABLE "warehouse_position"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0a2bf2eb1ce10624f81dd35d0a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c711ec89a4f8dc39a831de4374"`);
        await queryRunner.query(`DROP TABLE "delivery"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ac1455877a69957f7466d5dc78"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`DROP TABLE "delivery_status"`);
        await queryRunner.query(`DROP TABLE "component_type"`);
        await queryRunner.query(`DROP TABLE "subcomponent"`);
        await queryRunner.query(`DROP TABLE "component_subcomponent"`);
        await queryRunner.query(`DROP TABLE "subcomponent_status"`);
        await queryRunner.query(`DROP TABLE "component_status"`);
    }

}
