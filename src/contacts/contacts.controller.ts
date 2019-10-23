import {
  Controller,
  Get,
  Query,
  Post,
  Res,
  Body,
  Put,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import {
  CreateContactDto,
  UpdateContactDto,
  ListAllEntities,
} from './dto/index';
import { ContactsService } from './contacts.service';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}
  @Post()
  async create(
    @Body() createContactDto: CreateContactDto,
    @Res() res: Response,
  ) {
    const contact = await this.contactsService.create(createContactDto);
    return res.status(HttpStatus.CREATED).json(contact);
  }

  @Get()
  async findByPage(@Res() res: Response) {
    const contacts = await this.contactsService.findAll();
    return res.status(HttpStatus.OK).json(contacts);
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Res() res: Response) {
    const contact = await this.contactsService.findOne(id);
    if (!contact) {
      return res.status(HttpStatus.NOT_FOUND).send();
    }
    return res.status(HttpStatus.OK).json(contact);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateContactDto: UpdateContactDto,
    @Res() res: Response,
  ) {
    const contact = await this.contactsService.update(id, updateContactDto);
    return res.status(HttpStatus.ACCEPTED).json(contact);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const contact = await this.contactsService.findOne(id);
    if (!contact) {
      return res.status(HttpStatus.NOT_FOUND).send();
    }
    await contact.destroy();
    return res.status(HttpStatus.OK).json({});
  }
}
