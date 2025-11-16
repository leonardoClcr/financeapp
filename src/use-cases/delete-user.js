import { PostgresDeleteUserRepository } from "../repositories/postgres/delete-user";

export class DeleteUserUseCase {
  async execute(userId) {
    const postgresDeleteUserRepository = new PostgresDeleteUserRepository();
    await postgresDeleteUserRepository.execute(userId);
  }
}
