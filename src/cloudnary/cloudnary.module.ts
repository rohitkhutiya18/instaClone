import { Module } from '@nestjs/common';
import { CloudnaryService } from './cloudnary.service';

@Module({
  providers: [CloudnaryService],
  exports:[CloudnaryService]
})
export class CloudnaryModule {}
