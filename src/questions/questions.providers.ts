import { Question } from './question.entity';

export const questionsProviders = [
  {
    provide: 'QUESTIONS_REPOSITORY',
    useValue: Question
  }
];
