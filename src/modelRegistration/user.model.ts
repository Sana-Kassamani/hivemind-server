import { MongooseModule } from '@nestjs/mongoose';
import {
  Beekeeper,
  BeekeeperSchema,
} from 'src/core/users/schema/beekeeper.schema';
import { Owner, OwnerSchema } from 'src/core/users/schema/owner.schema';
import { User, UserSchema } from 'src/core/users/schema/user.schema';

export function registerUserModel(): any {
  return MongooseModule.forFeatureAsync([
    {
      name: User.name,
      useFactory: () => {
        const schema = UserSchema;
        schema.discriminator(Owner.name, OwnerSchema);
        schema.discriminator(Beekeeper.name, BeekeeperSchema);

        return schema;
      },
    },
  ]);
}
