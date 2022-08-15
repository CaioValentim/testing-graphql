import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Address')
export class AddressDTO {
  @Field()
  street: string;
}
