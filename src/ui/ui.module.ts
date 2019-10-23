import { Module } from '@nestjs/common';
import { UIController } from './ui.controller';

@Module({
  imports: [],
  controllers: [UIController],
  providers: []
})
export class UIModule {}
