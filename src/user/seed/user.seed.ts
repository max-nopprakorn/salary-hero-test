import { OnSeederInit, Seeder } from 'nestjs-sequelize-seeder';
import { User } from '../user.entity';
import { genSaltSync, hash, hashSync, genSalt } from 'bcrypt';

@Seeder({
  model: User,
  containsForeignKeys: true,
})
export class SeedUser implements OnSeederInit<User> {
  run() {
    const salt = 10
    const password = hashSync('P@ssw0rd', salt)
    const data = [
      {
        username: 'salary-hero',
        password: password,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        isAdded: true
      },
    ];

    return data;
  }
}
