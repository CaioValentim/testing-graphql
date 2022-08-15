import { Query } from '@nestjs/common';
import { ResolveField, Resolver } from '@nestjs/graphql';
import { UserDTO } from './dto/user.dto';
@Resolver(() => UserDTO)
export class UserResolver {
  @Query(() => UserDTO, { name: 'listUsers' })
  async list(): Promise<UserDTO[]> {
    return [new UserDTO()];
  }

  @ResolveField('address', () => [BidDTO])
  async getEventBids(@Parent() event: EventEntity): Promise<BidEntity[]> {
    return await this.bidService.list({ event });
  }
}
