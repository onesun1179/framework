import { Module } from '@nestjs/common';
import { FileController } from '@file/file.controller';
import { FileService } from '@file/file.service';

@Module({
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
