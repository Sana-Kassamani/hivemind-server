import { MongooseModule } from '@nestjs/mongoose';

export function registerModel(model: any, schema: any) {
  return MongooseModule.forFeature([
    {
      name: model.name,
      schema: schema,
    },
  ]);
}
