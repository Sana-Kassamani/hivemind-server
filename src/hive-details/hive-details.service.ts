import { Injectable } from '@nestjs/common';
import { HivesService } from 'src/hives/hives.service';

@Injectable()
export class HiveDetailsService {
  constructor(private hivesService: HivesService) {}

  async getHiveDetails(apiaryId: string, hiveId: string) {
    const hive = await this.hivesService.getHiveById(apiaryId, hiveId);
    return hive.iotDetails;
  }
}
