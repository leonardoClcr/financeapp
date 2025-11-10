import { CreateUserUseCase } from "../use-cases/create-user.js";
import validator from "validator";
import { badRequest, created, serverError } from "./helpers.js";

export class CreateUserController {
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

      const emailIsValid = validator.isEmail(params.email);

      if (!emailIsValid) {
        return badRequest({
          message: "Invalid e-mail. Please provided a valid one.",
        });
      }

      // validar tamanho de senha
      if (params.password.length < 6) {
        return badRequest({
          message: "Password must be at least 6 characters.",
        });
      }

      // chamar o use case
      const createUserUseCase = new CreateUserUseCase();

      const createdUser = await createUserUseCase.execute(params);
      // retornar a reposta para o usuario (status code)

      return created(createdUser);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
