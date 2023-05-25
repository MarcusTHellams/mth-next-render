import { Arg, Args, ArgsType, Field, InputType, Int, Mutation, Resolver } from 'type-graphql';

@InputType()
class MyInput {
  @Field(() => String)
  title!: string;

  @Field(() => Int)
  age!: number;
}

@Resolver(() => String)
export class Mine {
  @Mutation(()=> String)
  async addMine(@Arg('input') { age, title }: MyInput) {
    return `My title is ${title} and I am ${age} years old`;
  }
}
