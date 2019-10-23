import { Contact } from './contact.entity';

export const contactsProviders = [
  {
    provide: 'CONTACTS_REPOSITORY',
    useValue: Contact,
  },
];
