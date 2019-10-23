import { Injectable, Inject } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact';
import { UpdateContactDto } from './dto';
import { Contact } from './contact.entity';

@Injectable()
export class ContactsService {
  constructor(
    @Inject('CONTACTS_REPOSITORY')
    private readonly CONTACTS_REPOSITORY: typeof Contact,
  ) {}
  async create(contact: CreateContactDto): Promise<Contact> {
    return await this.CONTACTS_REPOSITORY.create<Contact>(contact);
  }
  update(id: number, contact: UpdateContactDto) {
    return this.CONTACTS_REPOSITORY.update(contact, { where: { id } });
  }
  async findOne(id): Promise<Contact> {
    return await this.CONTACTS_REPOSITORY.findOne<Contact>({ where: { id } });
  }
  async findAll(): Promise<Contact[]> {
    return await this.CONTACTS_REPOSITORY.findAll<Contact>();
  }
}
