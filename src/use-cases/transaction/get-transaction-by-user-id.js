import { userNotFoundResponse } from "../../controllers/helpers/user.js";

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
      return userNotFoundResponse;
    }

    // chamar o repository

    const transactions =
      await this.postgresGetTransactionByUserIdRepository.execute(
        params.userId,
      );

    return transactions;
  }
}
