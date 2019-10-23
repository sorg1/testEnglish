import { Injectable, Inject } from '@nestjs/common';
import { CreateOptionDto } from './dto/create-option';
import { Option } from './option.entity';

@Injectable()
export class OptionsService {
  constructor(
    @Inject('OPTIONS_REPOSITORY')
    private readonly OPTIONS_REPOSITORY: typeof Option
  ) {}
  async create(option: CreateOptionDto): Promise<Option> {
    return await this.OPTIONS_REPOSITORY.create<Option>(option);
  }
  async findAll(): Promise<Option[]> {
    return await this.OPTIONS_REPOSITORY.findAll();
  }
}
