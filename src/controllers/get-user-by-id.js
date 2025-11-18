import {
  checkIfIdIsValid,
  invalidIdResponse,
  notFound,
  ok,
  serverError,
} from "./helpers/index.js";

export class GetUserByIdController {
  constructor(getUserByIdUseCase) {
    this.getUserByIdUseCase = getUserByIdUseCase;
  }
  async execute(httpParams) {
    try {
      const isIdValid = checkIfIdIsValid(httpParams.params.userId);

      if (!isIdValid) {
        return invalidIdResponse();
      }

      const user = await this.getUserByIdUseCase.execute(
        httpParams.params.userId,
      );

      if (!user) {
        return notFound({
          message: "User not found.",
        });
      }

      return ok(user);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
