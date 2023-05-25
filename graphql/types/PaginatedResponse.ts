import {
  ClassType,
  Field,
  Int,
  ObjectType,
} from 'type-graphql';

export default function PaginatedResponse<TItem>(TItemClass: ClassType<TItem>) {
  @ObjectType()
  abstract class PaginatedResponseClass {
    @Field(() => [TItemClass])
    items!: TItem[];

    @Field(() => Int)
    totalPages!: number;

    @Field(() => Int)
    itemCount!: number;

    @Field(() => Int)
    totalCount!: number;

    @Field(() => Boolean)
    hasNextPage!: boolean;

    @Field(() => Boolean)
    hasPrevPage!: boolean;

    @Field(() => Int)
    currentPage!: number;
  }
  return PaginatedResponseClass;
}
