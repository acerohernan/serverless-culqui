import { APIGatewayProxyResult } from "aws-lambda";
import { v4 as uuid } from "uuid";
import { ClassValidator } from "../../shared/domain/ClassValidator";
import { RandomString } from "../../shared/domain/RandomString";
import { UseCase } from "../../shared/domain/UseCase";
import { Card } from "../domain/Card";
import { CardRepository } from "../domain/CardRepository";
import { CreateTokenDTO } from "../domain/dtos/CreateTokenDTO";

export class CreateTokenUseCase implements UseCase {
  constructor(private repository: CardRepository) {}

  async run(
    pk_key: string,
    cardBody: Record<string, any>
  ): Promise<APIGatewayProxyResult> {
    /* Validate the information */
    const body: string = JSON.stringify({
      ...cardBody,
      pk_key,
    } as CreateTokenDTO);

    const { result: dto, errors } =
      await ClassValidator.validate<CreateTokenDTO>(CreateTokenDTO, body);

    if (!dto)
      return {
        statusCode: 400,
        body: JSON.stringify({ errors }),
      };

    /* Create a card token */
    const card_token = RandomString.generate(16);

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
