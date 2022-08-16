import { ArgsType, Field, InputType } from '@nestjs/graphql';

@ArgsType()
export class AddressDynamicNameDTO {
  @Field()
  street: string;
}
