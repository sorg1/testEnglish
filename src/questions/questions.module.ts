import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { optionsProviders } from './options/options.providers';
import { OptionsService } from './options/options.service';
import { questionsProviders } from './questions.providers';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [QuestionsController],
  providers: [
      QuestionsService,
      ...questionsProviders,
      ...optionsProviders,
      OptionsService
  ]
})
export class QuestionsModule {}
