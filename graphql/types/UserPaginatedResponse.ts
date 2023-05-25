import { User } from '@generated/type-graphql';
import { ObjectType } from 'type-graphql';

import PaginatedResponse from './PaginatedResponse';

@ObjectType()
export class UserPaginatedResponse extends PaginatedResponse<User>(User){}