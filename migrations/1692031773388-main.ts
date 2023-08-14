import { MigrationInterface, QueryRunner } from 'typeorm';

export class Main1692031773388 implements MigrationInterface {
  name = 'Main1692031773388';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "album" ("id" uuid NOT NULL, "name" character varying NOT NULL, "year" integer NOT NULL, "artistId" character varying NOT NULL, CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "artist" ("id" uuid NOT NULL, "name" character varying NOT NULL, "grammy" boolean NOT NULL, CONSTRAINT "PK_55b76e71568b5db4d01d3e394ed" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "track" ("id" uuid NOT NULL, "name" character varying NOT NULL, "artistId" character varying NOT NULL, "albumId" character varying NOT NULL, "duration" integer NOT NULL, CONSTRAINT "PK_0631b9bcf521f8fab3a15f2c37e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "favorites_ids" ("id" integer NOT NULL, "artirstId" uuid, "albumId" uuid, "trackId" uuid, CONSTRAINT "REL_a8caad05042c5ad50684044295" UNIQUE ("artirstId"), CONSTRAINT "REL_d97bd7f2cffc3884833d2cc4b7" UNIQUE ("albumId"), CONSTRAINT "REL_8163182e18d6380325f50a52d4" UNIQUE ("trackId"), CONSTRAINT "PK_10cf4f5fb86a19d5b3736a24161" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_ids" ADD CONSTRAINT "FK_a8caad05042c5ad50684044295a" FOREIGN KEY ("artirstId") REFERENCES "artist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_ids" ADD CONSTRAINT "FK_d97bd7f2cffc3884833d2cc4b79" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_ids" ADD CONSTRAINT "FK_8163182e18d6380325f50a52d45" FOREIGN KEY ("trackId") REFERENCES "track"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "favorites_ids" DROP CONSTRAINT "FK_8163182e18d6380325f50a52d45"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_ids" DROP CONSTRAINT "FK_d97bd7f2cffc3884833d2cc4b79"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_ids" DROP CONSTRAINT "FK_a8caad05042c5ad50684044295a"`,
    );
    await queryRunner.query(`DROP TABLE "favorites_ids"`);
    await queryRunner.query(`DROP TABLE "track"`);
    await queryRunner.query(`DROP TABLE "artist"`);
    await queryRunner.query(`DROP TABLE "album"`);
  }
}
