import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddActivationToken1712930400000 implements MigrationInterface {
  name = 'AddActivationToken1712930400000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'activation_token',
        type: 'uuid',
        isNullable: true,
      }),
    );

    // Existing active users keep isActive=true, new registrations will default to false
    // Update default for is_active column to false
    await queryRunner.query(`
      ALTER TABLE "users" ALTER COLUMN "is_active" SET DEFAULT false
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "users" ALTER COLUMN "is_active" SET DEFAULT true
    `);
    await queryRunner.dropColumn('users', 'activation_token');
  }
}
