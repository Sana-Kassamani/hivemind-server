import { Controller, Get, Param } from '@nestjs/common';
import { HiveDetailsSchema } from './schema/hive-details.schema';
import { HiveDetailsService } from './hive-details.service';

@Controller('hive-details')
export class HiveDetailsController {
  constructor(private hiveDetailsService: HiveDetailsService) {}

  @Get(':apiaryId/:hiveId')
  getHiveDetails(
    @Param('apiaryId') apiaryId: string,
    @Param('hiveId') hiveId: string,
  ) {
    return this.hiveDetailsService.getHiveDetails(apiaryId, hiveId);
  }
}
