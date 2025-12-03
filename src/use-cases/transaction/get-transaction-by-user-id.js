import { UserNotFoundError } from "../../errors/user.js";

export class GetTransactionByUserIdUseCase {
  constructor(
    postgresGetTransactionByUserIdRepository,
    postgresGetUserByIdRepository,
  ) {
    ((this.postgresGetTransactionByUserIdRepository =
      postgresGetTransactionByUserIdRepository),
      (this.postgresGetUserByIdRepository = postgresGetUserByIdRepository));
  }

  async execute(params) {
    // validar se o usuario existe
    const user = await this.postgresGetUserByIdRepository.execute(
      params.userId,
    );

    if (!user) {
      throw new UserNotFoundError();
    }

    // chamar o repository

    const transactions =
      await this.postgresGetTransactionByUserIdRepository.execute(
        params.userId,
      );

    return transactions;
  }
}
