import {
  Controller,
  Get,
  Req,
  Res,
  Next
} from '@nestjs/common';
import {
    resolve
} from 'path';
import { Request, Response, NextFunction } from 'express';

@Controller('app')
export class UIController {
  @Get('*')
  async getContent (@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
      if (req.accepts(['html', 'json']) === 'html') {
          const filePath = resolve(__dirname, '../../app-dist/index.html');
          res.sendFile(filePath);
      } else {
          next();
      }
  }
}
