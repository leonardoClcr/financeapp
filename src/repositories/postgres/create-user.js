import { PostgresHelper } from "../../db/postgres/helper.js";

export class PostgresCreateUserRepository {
  async execute(createUserParams) {
    // create user in postgres
    const results = await PostgresHelper.query(
      "INSERT INTO users (ID, first_name, last_name, email, password) VALEUS ($1, $2, $3, $4, $5)",
      [
        createUserParams.id,
        createUserParams.first_name,
        createUserParams.last_name,
        createUserParams.email,
        createUserParams.password,
      ],
    );

    return results[0];
  }
}
