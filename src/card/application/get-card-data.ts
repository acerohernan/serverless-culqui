import { APIGatewayProxyResult } from "aws-lambda";
import { UseCase } from "../../shared/domain/UseCase";
import { CardRepository } from "../domain/CardRepository";

export class GetCardDataUseCase implements UseCase {
  constructor(private repository: CardRepository) {}

  async run(token: string): Promise<APIGatewayProxyResult> {
    const card = await this.repository.getByToken(token);

    if (!card) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Not Found" }),
      };
    }

    const { cvv, pk_key, id, ...cardToSend } = card;
    return {
      statusCode: 200,
      body: JSON.stringify(cardToSend),
    };
  }
}
