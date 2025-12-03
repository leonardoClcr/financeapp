import { UserNotFoundError } from "../../errors/user.js";
import {
  userNotFoundResponse,
  serverError,
  requiredFieldIsMissingResponse,
  checkIfIdIsValid,
  invalidIdResponse,
  ok,
} from "../helpers/index.js";

export class GetTransactionByUserIdController {
  constructor(getTransactionByUserIdUseCase) {
    this.getTransactionByUserIdUseCase = getTransactionByUserIdUseCase;
  }

  async execute(httpRequest) {
    try {
      const userId = httpRequest.query.userId;
      // verificar se o userId foi passado
      if (!userId) {
        return requiredFieldIsMissingResponse("userId");
      }

      // verificar se o id é valido
      const userIdIsValid = checkIfIdIsValid(userId);
      if (!userIdIsValid) {
        return invalidIdResponse();
      }
      // chamar o use case
      const transactions = await this.getTransactionByUserIdUseCase.execute({
        userId,
      });
      // retornar resposta http

      return ok(transactions);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return userNotFoundResponse();
      }
      console.error(error);
      return serverError();
    }
  }
}
