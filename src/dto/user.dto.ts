import { ObjectType, Field } from '@nestjs/graphql';
import { AddressDTO } from './address.dto';

@ObjectType('User')
export class UserDTO {
  @Field()
  name: string;

  @Field(() => AddressDTO)
  addresses: AddressDTO;
}
