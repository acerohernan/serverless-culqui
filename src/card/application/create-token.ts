import { APIGatewayProxyResult } from "aws-lambda";
import { customAlphabet } from "nanoid";
import { alphanumeric } from "nanoid-dictionary";
import { v4 as uuid } from "uuid";
import { UseCase } from "../../shared/domain/UseCase";
import { Card } from "../domain/Card";
import { CardRepository } from "../domain/CardRepository";
import { CreateTokenDTO } from "../domain/dtos/CreateTokenDTO";

export class CreateTokenUseCase implements UseCase {
  constructor(private repository: CardRepository) {}

  async run(dto: CreateTokenDTO): Promise<APIGatewayProxyResult> {
    /* Create a card token */
    const nanoid = customAlphabet(alphanumeric, 16);
    const card_token = nanoid();

    /* Save to the repository */
    let cardToSave: Card = {
      ...dto,
      card_token,
      id: uuid(),
    };

    await this.repository.create(cardToSave);

    return {
      statusCode: 201,
      body: JSON.stringify(cardToSave),
    };
  }
}
