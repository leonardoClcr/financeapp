import { ok, serverError } from "../helpers/http.js";
import { checkIfIdIsValid, invalidIdResponse } from "../helpers/index.js";

export class DeleteUserController {
  constructor(deleteUserUseCase) {
    this.deleteUserUseCase = deleteUserUseCase;
  }
  async execute(httpRequest) {
    try {
      const userId = httpRequest.params.userId;
      // verificar se o id é válido
      const idIsvalid = checkIfIdIsValid(userId);

      if (!idIsvalid) {
        return invalidIdResponse();
      }

      const deletedUser = await this.deleteUserUseCase.execute(userId);

      return ok(deletedUser);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
