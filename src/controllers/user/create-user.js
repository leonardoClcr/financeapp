import { EmailAlreadyInUseError } from "../../errors/user.js";
import {
  checkIfEmailIsValid,
  checkIfPasswordIsValid,
  invalidEmailResponse,
  invalidPasswordResponse,
  badRequest,
  created,
  serverError,
} from "../helpers/index.js";

export class CreateUserController {
  constructor(createUserUseCase) {
    this.createUserUseCase = createUserUseCase;
  }
  async execute(httpRequest) {
    try {
      const params = httpRequest.body;
      // validar a requisição (campos obrigatorios e tamanho de senha e email)
      const requiredFields = ["first_name", "last_name", "email", "password"];

      for (const field of requiredFields) {
        if (!params[field] || params[field].trim().length == 0) {
          return badRequest({ message: `Missing param: ${field}` });
        }
      }

      // validar o email

      const emailIsValid = checkIfEmailIsValid(params.email);

      if (!emailIsValid) {
        return invalidEmailResponse();
      }

      // validar tamanho de senha
      const passwordIsValid = checkIfPasswordIsValid(params.password);
      if (!passwordIsValid) {
        return invalidPasswordResponse();
      }

      // chamar o use case
      const createdUser = await this.createUserUseCase.execute(params);
      // retornar a reposta para o usuario (status code)

      return created(createdUser);
    } catch (error) {
      if (error instanceof EmailAlreadyInUseError) {
        return badRequest({ message: error.message });
      }
      console.error(error);
      return serverError();
    }
  }
}
