import { Sequelize } from 'sequelize-typescript';
import { Contact } from '../contacts/contact.entity';
import { Question } from '../questions/question.entity';
import { Option } from '../questions/options/option.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'password32R',
        database: 'nest'
      });
      sequelize.addModels([
          Contact,
          Option,
          Question
      ]);
      await sequelize.sync();
      return sequelize;
    }
  }
];
