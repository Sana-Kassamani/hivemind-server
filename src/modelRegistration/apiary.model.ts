import { Apiary, ApiarySchema } from 'src/core/apiaries/schema/apiary.schema';
import { registerModel } from './model';

export function registerApiaryModel() {
  return registerModel(Apiary, ApiarySchema);
}
