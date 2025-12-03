import {
  CreateTransactionController,
  GetTransactionByUserIdController,
} from "../controllers/index.js";
import {
  PostgresCreateTransactionRepository,
  PostgresGetTransactionByUserIdRepository,
  PostgresGetUserByIdRepository,
} from "../repositories/postgres/index.js";
import {
  CreateTransactionUseCase,
  GetTransactionByUserIdUseCase,
} from "../use-cases/index.js";

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

export const makeGetTransactionByUserIdController = () => {
  const postgresGetTransactionByUserIdRepository =
    new PostgresGetTransactionByUserIdRepository();

  const postgresGetUserByIdRepository = new PostgresGetUserByIdRepository();

  const getTransactionByUserIdUseCase = new GetTransactionByUserIdUseCase(
    postgresGetTransactionByUserIdRepository,
    postgresGetUserByIdRepository,
  );

  const getTransactionByUserIdController = new GetTransactionByUserIdController(
    getTransactionByUserIdUseCase,
  );

  return getTransactionByUserIdController;
};
