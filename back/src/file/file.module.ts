import { Module } from '@nestjs/common';
import { FileController, FileService } from '@file';

@Module({
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
