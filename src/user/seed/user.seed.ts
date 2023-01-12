import { OnSeederInit, Seeder } from "nestjs-sequelize-seeder";
import { User } from "../user.entity";
import { hashSync } from 'bcrypt';

@Seeder({
    model: User
})
export class SeedUser implements OnSeederInit<User> {
    run() {
        const data = [
            {
                username: 'salary-hero',
                password: 'P@ssw0rd'
            }
        ]

        return data
    }

    everyone(data) {
        if (data.password) {
            const salt = 10;
            data.password = hashSync(data.password, salt);
         }
   
         data.created_at = new Date().toISOString();
         data.updated_at = new Date().toISOString();
   
         return data;
    }
}