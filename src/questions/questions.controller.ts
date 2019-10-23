import {
  Controller,
  Get,
  Post,
  Res,
  Body,
  Put,
  Param,
  Delete,
  HttpStatus
} from '@nestjs/common';
import { Response } from 'express';
import {
  CreateQuestionDto,
  UpdateQuestionDto
} from './dto/index';
import { QuestionsService } from './questions.service';
import { OptionsService } from './options/options.service';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService, private readonly optionsService: OptionsService) {}
  @Post()
  async create(
    @Body() createQuestionDto: CreateQuestionDto,
    @Res() res: Response
  ) {
    const question = await this.questionsService.create(createQuestionDto);
    const jobs = [];
    jobs.push(this.optionsService.create({
        questionId: question.id,
        text: createQuestionDto.optionA
    }));
    jobs.push(this.optionsService.create({
        questionId: question.id,
        text: createQuestionDto.optionB
    }));
    jobs.push(this.optionsService.create({
        questionId: question.id,
        text: createQuestionDto.optionC
    }));
    jobs.push(this.optionsService.create({
        questionId: question.id,
        text: createQuestionDto.optionD
    }));
    question.dataValues.options = await Promise.all(jobs);
    return res.status(HttpStatus.CREATED).json(question);
  }

  @Get()
  async findByPage(@Res() res: Response) {
    const questions = await this.questionsService.findAll();
    return res.status(HttpStatus.OK).json(questions);
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Res() res: Response) {
    const question = await this.questionsService.findOne(id);
    if (!question) {
      return res.status(HttpStatus.NOT_FOUND).send();
    }
    return res.status(HttpStatus.OK).json(question);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateQuestionDto: UpdateQuestionDto,
    @Res() res: Response
  ) {
    const question = await this.questionsService.update(id, updateQuestionDto);
    return res.status(HttpStatus.ACCEPTED).json(question);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const question = await this.questionsService.findOne(id);
    if (!question) {
      return res.status(HttpStatus.NOT_FOUND).send();
    }
    await question.destroy();
    return res.status(HttpStatus.OK).json({});
  }
}
