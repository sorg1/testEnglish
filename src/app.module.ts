import { Module } from '@nestjs/common';
import { ContactsModule } from './contacts/contacts.module';
import { QuestionsModule } from './questions/questions.module';
import { AuthModule } from './auth/auth.module';
import { UIModule } from './ui/ui.module';

@Module({
  imports: [
      ContactsModule,
      QuestionsModule,
      AuthModule,
      UIModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
