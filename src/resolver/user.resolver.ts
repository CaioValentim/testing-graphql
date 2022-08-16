import { Resolver, Query, ResolveField, Parent, Args } from '@nestjs/graphql';
import { UserDTO } from '../dto/user.dto';
import { plainToClass } from 'class-transformer';
import { AddressDTO } from '../dto/address.dto';
import { AddressDynamicNameDTO } from '../dto/address-dynamic-name.dto';
@Resolver(() => UserDTO)
export class UserResolver {
  // When I receive a request by this query, I wouldn't like to call resolveField('address')
  @Query(() => UserDTO)
  async userWithStaticAddress(): Promise<UserDTO> {
    const userDTO = plainToClass(UserDTO, {
      name: 'John Doe',
      address: plainToClass(AddressDTO, { street: 'static street' }),
    });
    return userDTO;
  }

  // When I receive a request by this query, I would like to call resolveField('address')
  @Query(() => UserDTO)
  async userWithDynamicAddress(
    @Args() addressDynamicName: AddressDynamicNameDTO,
  ): Promise<UserDTO> {
    const userDTO = plainToClass(UserDTO, { name: 'John Doe' });
    return userDTO;
  }

  @ResolveField('address', () => AddressDTO)
  async getDynamicAddress(@Parent() userDTO: UserDTO): Promise<AddressDTO> {
    //I want to access my parent arguments here (address Dynamic Name), but I don't find a way to do it.
    //I would like to build my street name like it ---> street:`${userDTO.name} custom ${addressDynamicName.street}`
    const calculatedAddress = plainToClass(AddressDTO, {
      street: `${userDTO.name} custom`,
    });
    return calculatedAddress;
  }
}
