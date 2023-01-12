import { OnSeederInit, Seeder } from 'nestjs-sequelize-seeder';
import { Role } from '../role.entity';

@Seeder({
  model: Role,
  containsForeignKeys: true,
})
export class SeedRole implements OnSeederInit<Role> {
  run() {
    const data = [
      {
        name: 'HERO',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        name: 'CLIENT_ADMIN',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        name: 'EMPLOYEE',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];
    return data;
  }
}
