import { Injectable, Inject } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question';
import { UpdateQuestionDto } from './dto';
import { Question } from './question.entity';
import { Option } from './options/option.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @Inject('QUESTIONS_REPOSITORY')
    private readonly QUESTIONS_REPOSITORY: typeof Question,
  ) {}
  async create(question: CreateQuestionDto): Promise<Question> {
    return await this.QUESTIONS_REPOSITORY.create<Question>(question);
  }
  update(id: number, question: UpdateQuestionDto) {
    return this.QUESTIONS_REPOSITORY.update(question, { where: { id } });
  }
  async findOne(id): Promise<Question> {
    return await this.QUESTIONS_REPOSITORY.findOne<Question>({ where: { id } });
  }
  async findAll(): Promise<Question[]> {
    return await this.QUESTIONS_REPOSITORY.findAll({
        include: [Option]
    });
  }
}
