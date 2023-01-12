import { OnSeederInit, Seeder } from 'nestjs-sequelize-seeder';
import { UserRole } from '../user-role.entity';

@Seeder({
  model: UserRole,
  containsForeignKeys: true,
})
export class SeedUserRole implements OnSeederInit<UserRole> {
  run() {
    const data = [
      {
        userId: 1,
        roleId: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];

    return data;
  }

}
