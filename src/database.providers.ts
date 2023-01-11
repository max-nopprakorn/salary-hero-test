import { Sequelize } from 'sequelize-typescript';
import { config } from 'config/config';
import { Dialect } from 'sequelize';
import { User } from './user/user.entity';
import { Role } from './role/role.entity';
import { UserRole } from './user-role/user-role.entity';
import { Company } from './company/company.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        username: config.postgres.username,
        password: config.postgres.password,
        database: config.postgres.database,
        host: config.postgres.host,
        dialect: 'postgres' as Dialect,
        port: config.postgres.port,
      });
      sequelize.addModels([User, Role, UserRole, Company]);
      await sequelize.sync();
      return sequelize;
    },
  },
  {
    provide: 'USER_REPOSITORY',
    useValue: User
  },
  {
    provide: 'ROLE_REPOSITORY',
    useValue: Role
  },
  {
    provide: 'USER_ROLE_REPOSITORY',
    useValue: UserRole
  },
  {
    provide: 'COMPANY_REPOSITORY',
    useValue: Company
  }
];
