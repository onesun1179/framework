import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { FileService } from './file.service';
import { resolve } from 'path';
import { createReadStream } from 'fs';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get(':path/:fileName')
  getFile(
    @Res() res: Response,
    @Param('path') path: string,
    @Query('fileName') fileName,
  ) {
    const file = createReadStream(resolve('..', '/resource', path, fileName));
    // @ts-ignore
    file.pipe(res);
  }
}
