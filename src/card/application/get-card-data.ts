import { APIGatewayProxyResult } from "aws-lambda";
import { ClassValidator } from "../../shared/domain/ClassValidator";
import { UseCase } from "../../shared/domain/UseCase";
import { CardRepository } from "../domain/CardRepository";
import { GetCardDataDTO } from "../domain/dtos/GetCardDataDTO";

export class GetCardDataUseCase implements UseCase {
  constructor(private repository: CardRepository) {}

  async run(pk_key: string, token: string): Promise<APIGatewayProxyResult> {
    /* Validate the dto */
    const data = JSON.stringify({ pk_key, token });

    const { result: dto, errors } =
      await ClassValidator.validate<GetCardDataDTO>(GetCardDataDTO, data);

    if (!dto)
      return {
        statusCode: 400,
        body: JSON.stringify({ errors }),
      };

    /* Get the card information */
    const card = await this.repository.getByToken(token);

    if (!card) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Not Found" }),
      };
    }

    /* Send the information without cvv, pk_key and id */
    const { cvv, pk_key: key, id, ...cardToSend } = card;
    return {
      statusCode: 200,
      body: JSON.stringify(cardToSend),
    };
  }
}
