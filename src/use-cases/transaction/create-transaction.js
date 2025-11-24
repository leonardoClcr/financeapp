import { UserNotFoundError } from "../../errors/user";
import { v4 as uuidV4 } from "uuid";

export class CreateTransactionUseCase {
  constructor(getUserByIdRepository, postgresCreateTransactionRepository) {
    ((this.getUserByIdRepository = getUserByIdRepository),
      (this.postgresCreateTransactionRepository =
        postgresCreateTransactionRepository));
  }

  async execute(createTransactionParams) {
    const userId = createTransactionParams.userId;
    const user = await this.getUserByIdRepository.execute(userId);

    if (!user) {
      throw new UserNotFoundError(userId);
    }

    const transactionId = uuidV4();

    const transaction = await this.postgresCreateTransactionRepository.execute({
      ...createTransactionParams,
      id: transactionId,
    });

    return transaction;
  }
}
