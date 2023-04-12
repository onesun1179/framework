import { Controller, Get, Param } from '@nestjs/common';
import { FileService } from './file.service';
import * as fs from 'fs';
import { join } from 'path';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get('/icon/:path/:fileName')
  // @Render('svg.hbs')
  async getIcon(
    // @Res() res: Response,
    @Param('path') path: string,
    @Param('fileName') fileName: string,
  ) {
    const file = fs.readFileSync(
      join(process.cwd(), 'resource', 'icon', path, fileName),
    );
    return file.toString();
  }
}
