import "dotenv/config.js";
import express from "express";
import {
  GetUserByIdController,
  CreateUserController,
  UpdateUserController,
  DeleteUserController,
} from "./src/controllers/index.js";
import {
  PostgresCreateUserRepository,
  PostgresGetUserByEmailRepository,
  PostgresGetUserByIdRepository,
  PostgresUpdateUserRepository,
} from "./src/repositories/postgres/index.js";
import {
  CreateUserUseCase,
  GetUserByIdUseCase,
  UpdateUserUseCase,
} from "./src/use-cases/index.js";

const app = express();

app.use(express.json());

app.post("/api/users", async (request, response) => {
  const postgresGetUserByEmailRepository =
    new PostgresGetUserByEmailRepository();
  const postgresCreateUserRepository = new PostgresCreateUserRepository();
  const createUserUseCase = new CreateUserUseCase(
    postgresGetUserByEmailRepository,
    postgresCreateUserRepository,
  );
  const createUserController = new CreateUserController(createUserUseCase);
  const { statusCode, body } = await createUserController.execute(request);

  response.status(statusCode).send(body);
});

app.get("/api/users/:userId", async (request, response) => {
  const postgresGetUserByIdRepository = new PostgresGetUserByIdRepository();
  const getUserByIdUseCase = new GetUserByIdUseCase(
    postgresGetUserByIdRepository,
  );
  const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);
  const { statusCode, body } = await getUserByIdController.execute(request);

  response.status(statusCode).send(body);
});

app.patch("/api/users/:userId", async (request, response) => {
  const postgresGetUserByEmailRepository =
    new PostgresGetUserByEmailRepository();
  const postgresUpdateUserRepository = new PostgresUpdateUserRepository();
  const updateUserUseCase = new UpdateUserUseCase(
    postgresGetUserByEmailRepository,
    postgresUpdateUserRepository,
  );
  const updateUserController = new UpdateUserController(updateUserUseCase);
  const { statusCode, body } = await updateUserController.execute(request);

  response.status(statusCode).send(body);
});

app.delete("/api/users/:userId", async (request, response) => {
  const deleteUserController = new DeleteUserController();
  const { statusCode, body } = await deleteUserController.execute(request);
  response.status(statusCode).send(body);
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
