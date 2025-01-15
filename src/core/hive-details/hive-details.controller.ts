import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { HiveDetailsSchema } from './schema/hive-iotDetails.schema';
import { HiveDetailsService } from './hive-details.service';
import { CreateIOTDetailsDto } from './dto/create-iotDetails.dto';
import { Public } from 'src/auth/decorators/public.decorator';

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
    @Body() createIOTDetails: CreateIOTDetailsDto,
  ) {
    return this.hiveDetailsService.addHiveDetails(
      apiaryId,
      hiveId,
      createIOTDetails,
    );
  }

  @Public()
  @Post('/iot')
  getIotDetails(@Body() createIotDetailDto: CreateIOTDetailsDto) {
    return this.hiveDetailsService.getIotDetails(createIotDetailDto);
  }

  @Public()
  @Post('/alert')
  getIotAlert(@Body() body: any) {
    return this.hiveDetailsService.alertIot(body);
    //
  }
}
