import { PrismaClient, PrismaPromise } from ".prisma/client";

type Query<T, T2> = (
  parent: any,
  args: T2,
  context: {
    prisma: PrismaClient;
  }
) => PrismaPromise<T>;

interface Queries<T, T2> {
  [name: string]: Query<T, T2>;
}
