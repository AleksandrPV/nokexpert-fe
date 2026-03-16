import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddNewUserFields1704067200000 implements MigrationInterface {
  name = 'AddNewUserFields1704067200000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Добавляем новые поля в таблицу users
    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'username',
        type: 'varchar',
        isNullable: true,
        isUnique: true,
      }),
      new TableColumn({
        name: 'middle_name',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'status',
        type: 'enum',
        enum: ['active', 'inactive', 'suspended', 'pending'],
        default: "'active'",
      }),
      new TableColumn({
        name: 'qualifications',
        type: 'json',
        isNullable: true,
      }),
    ]);

    // Обновляем существующие записи
    await queryRunner.query(`
      UPDATE users 
      SET 
        status = CASE 
          WHEN is_active = true THEN 'active'::text 
          ELSE 'inactive'::text 
        END,
        role = CASE 
          WHEN role = 'candidate' THEN 'user'::text 
          ELSE role::text 
        END
      WHERE status IS NULL
    `);

    // Добавляем индексы для новых полей
    await queryRunner.query(`
      CREATE INDEX "IDX_users_username" ON "users" ("username")
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_users_status" ON "users" ("status")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Удаляем индексы
    await queryRunner.query(`DROP INDEX "IDX_users_status"`);
    await queryRunner.query(`DROP INDEX "IDX_users_username"`);

    // Удаляем новые поля
    await queryRunner.dropColumns('users', [
      'qualifications',
      'status',
      'middle_name',
      'username',
    ]);
  }
}
