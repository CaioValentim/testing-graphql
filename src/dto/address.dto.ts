import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Addresses')
export class AddressDTO {
  @Field()
  street: string;
}
