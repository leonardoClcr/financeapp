import { badRequest, ok, serverError } from "../controllers/helpers.js";
import { EmailAlreadyInUseError } from "../errors/user.js";
import { UpdateUserUseCase } from "../use-cases/update-user.js";
import validator from "validator";

export class UpdateUserController {
  async execute(httpRequest) {
    try {
      // validar o id sendo passado

      const userId = httpRequest.params.userId;
      const isIdValid = validator.isUUID(userId);
      if (!isIdValid) {
        return badRequest({
          message: "The provided id is not valid.",
        });
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
        const passwordIsNotValid = updatedUserParams.password.length < 6;

        if (passwordIsNotValid) {
          return badRequest({
            message: "Password must be at least 6 characters.",
          });
        }
      }

      // verificar o e-mail

      if (updatedUserParams.email) {
        const emailIsValid = validator.isEmail(updatedUserParams.email);

        if (!emailIsValid) {
          return badRequest({
            message: `The email ${updatedUserParams.email} is not valid. Please provided a valid one.`,
          });
        }
      }

      // chamar o use case

      const updateUserUseCase = new UpdateUserUseCase();
      const updatedUser = await updateUserUseCase.execute(
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
