import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { EmailAlreadyInUseError } from "../../errors/user.js";

export class CreateUserUseCase {
  constructor(postgresGetUserByEmailRepository, postgresCreateUserRepository) {
    ((this.postgresGetUserByEmailRepository = postgresGetUserByEmailRepository),
      (this.postgresCreateUserRepository = postgresCreateUserRepository));
  }
  async execute(createUserParams) {
    // verificar se o e-mail ja esta em uso

    const userWithProvidedemail =
      await this.postgresGetUserByEmailRepository.execute(
        createUserParams.email,
      );

    if (userWithProvidedemail) {
      throw new EmailAlreadyInUseError(createUserParams.email);
    }

    // gerar id do usuario
    const userId = uuidv4();
    // criptografar a senha
    const hashedPassword = await bcrypt.hash(createUserParams.password, 10);
    // inserir o usuario no banco de dados
    const user = {
      ...createUserParams,
      id: userId,
      password: hashedPassword,
    };

    // chamar o repositorio

    const createdUser = await this.postgresCreateUserRepository.execute(user);

    return createdUser;
  }
}
