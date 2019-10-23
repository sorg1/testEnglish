import { Option } from './option.entity';

export const optionsProviders = [
  {
    provide: 'OPTIONS_REPOSITORY',
    useValue: Option
  }
];
