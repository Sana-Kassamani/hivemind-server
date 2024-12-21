import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

  @Post(':apiaryId/:hiveId')
  addHiveDetails(
    @Param('apiaryId') apiaryId: string,
    @Param('hiveId') hiveId: string,
    // @Body('details') details: any,
  ) {
    return this.hiveDetailsService.addHiveDetails(apiaryId, hiveId);
  }
}
