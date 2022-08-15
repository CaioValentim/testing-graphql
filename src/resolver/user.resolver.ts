import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { UserDTO } from '../dto/user.dto';
import { plainToClass } from 'class-transformer';
import { AddressDTO } from '../dto/address.dto';
@Resolver(() => UserDTO)
export class UserResolver {
  @Query(() => UserDTO)
  async userWithStaticAddress(): Promise<UserDTO> {
    const userDTO = plainToClass(UserDTO, {
      name: 'Jon Doe',
      addresses: [plainToClass(AddressDTO, { street: 'street' })],
    });
    return userDTO;
  }

  @Query(() => UserDTO)
  async userWithDynamicAddress(): Promise<UserDTO> {
    const userDTO = plainToClass(UserDTO, { name: 'My name' });
    return userDTO;
  }

  @ResolveField('address', () => AddressDTO)
  async getDynamicAddress(@Parent() userDTO: UserDTO): Promise<AddressDTO> {
    const calculatedAddress = plainToClass(AddressDTO, {
      street: `${userDTO.name} street`,
    });
    return calculatedAddress;
  }
}
