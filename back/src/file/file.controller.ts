import { Controller, Get, Param, Res } from '@nestjs/common';
import { FileService } from './file.service';
import { join } from 'path';
import { createReadStream } from 'fs';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get('/icon/:path/:fileName')
  getIcon(
    @Res() res: Response,
    @Param('path') path: string,
    @Param('fileName') fileName,
  ) {
    const file = createReadStream(
      join(process.cwd(), 'resource', 'icon', path, fileName),
    );
    // @ts-ignore
    file.pipe(res);
  }
}
