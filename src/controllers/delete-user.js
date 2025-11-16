import { DeleteUserUseCase } from "../use-cases/delete-user.js";
import { ok, serverError } from "./helpers/http.js";
import { checkIfIdIsValid, invalidIdResponse } from "./helpers/user.js";

export class DeleteUserController {
  async execute(httpRequest) {
    try {
      const userId = httpRequest.params.userId;
      // verificar se o id é válido
      const idIsvalid = checkIfIdIsValid(userId);

      if (!idIsvalid) {
        return invalidIdResponse();
      }

      const deleteUserUseCase = new DeleteUserUseCase();
      const deletedUser = await deleteUserUseCase.execute(userId);

      return ok(deletedUser);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
