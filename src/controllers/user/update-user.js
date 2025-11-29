import { EmailAlreadyInUseError } from "../../errors/user.js";
import {
  checkIfEmailIsValid,
  checkIfIdIsValid,
  checkIfPasswordIsValid,
  invalidEmailResponse,
  invalidIdResponse,
  invalidPasswordResponse,
  badRequest,
  ok,
  serverError,
} from "../helpers/index.js";

export class UpdateUserController {
  constructor(updateUserUseCase) {
    this.updateUserUseCase = updateUserUseCase;
  }
  async execute(httpRequest) {
    try {
      // validar o id sendo passado

      const userId = httpRequest.params.userId;
      const isIdValid = checkIfIdIsValid(userId);
      if (!isIdValid) {
        return invalidIdResponse();
      }
      const updatedUserParams = httpRequest.body;

      // verificando se nao foi passado nenhum campo não permitido

      const allowedFields = ["first_name", "last_name", "email", "password"];

      const someFieldIsNotAllowed = Object.keys(updatedUserParams).some(
        (field) => !allowedFields.includes(field),
      );

      if (someFieldIsNotAllowed) {
        return badRequest({
          message: "Some provided field is not allowed.",
        });
      }
      // verificar a senha

      if (updatedUserParams.password) {
        const passowordIsValid = checkIfPasswordIsValid(httpRequest.password);

        if (!passowordIsValid) {
          return invalidPasswordResponse();
        }
      }

      // verificar o e-mail

      if (updatedUserParams.email) {
        const emailIsValid = checkIfEmailIsValid(updatedUserParams.email);

        if (!emailIsValid) {
          return invalidEmailResponse();
        }
      }

      // chamar o use case

      const updatedUser = await this.updateUserUseCase.execute(
        userId,
        updatedUserParams,
      );

      return ok(updatedUser);
    } catch (error) {
      if (error instanceof EmailAlreadyInUseError) {
        return badRequest({ message: error.message });
      }
      console.error(error);
      return serverError();
    }
  }
}
