import { GetUserByIdUseCase } from "../use-cases/get-user-by-id.js";
import { badRequest, ok, serverError } from "./helpers.js";
import validator from "validator";

export class GetUserByIdController {
  async execute(httpParams) {
    try {
      const isIdValid = validator.isUUID(httpParams.params.userId);

      if (!isIdValid) {
        return badRequest({
          message: "The provided id is not valid.",
        });
      }

      const getUserByIdUseCase = new GetUserByIdUseCase();

      const user = await getUserByIdUseCase.execute(httpParams.params.userId);

      return ok(user);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
