import { CreateTransactionController } from "../controllers/index.js";
import {
  PostgresCreateTransactionRepository,
  PostgresGetUserByIdRepository,
} from "../repositories/postgres/index.js";
import { CreateTransactionUseCase } from "../use-cases/index.js";

export const makeCreateTransactionController = () => {
  const postgresGetUserByIdRepository = new PostgresGetUserByIdRepository();
  const postgresCreateTransactionRepository =
    new PostgresCreateTransactionRepository();
  const createTransactionUseCase = new CreateTransactionUseCase(
    postgresGetUserByIdRepository,
    postgresCreateTransactionRepository,
  );

  const createTransactionController = new CreateTransactionController(
    createTransactionUseCase,
  );

  return createTransactionController;
};
