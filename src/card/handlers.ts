import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { transformAndValidate } from "class-transformer-validator";
import { CreateTokenUseCase } from "./application/create-token";
import { GetCardDataUseCase } from "./application/get-card-data";
import { CreateTokenDTO } from "./domain/dtos/CreateTokenDTO";
import { GetCardDataDTO } from "./domain/dtos/GetCardDataDTO";
import { DynamoDBCardRepository } from "./infraestructure/DynamoDBCardReposiotry";

export const createToken = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    /* Get the pk_key */
    const bearer = event.headers["authorization"];
    let pk_key = "";
    if (bearer) pk_key = bearer.replace("Bearer ", "");

    /* Validate all the data */
    const body = JSON.parse(event.body || "{}");
    const cardBody: string = JSON.stringify({
      ...body,
      pk_key,
    } as CreateTokenDTO);

    let dto: CreateTokenDTO | null = null;

    try {
      dto = (await transformAndValidate(
        CreateTokenDTO,
        cardBody
      )) as CreateTokenDTO;
    } catch (err: any) {
      let errors: string[] = [];

      err.forEach((err) => {
        err.constraints &&
          Object.values(err.constraints).forEach((message) =>
            errors.push(message as string)
          );
      });

      return {
        statusCode: 400,
        body: JSON.stringify({ errors }),
      };
    }

    if (!dto)
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "bad request" }),
      };

    /* Initialize the use case */
    const repository = new DynamoDBCardRepository();
    const service = new CreateTokenUseCase(repository);

    return await service.run(dto);
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server Error" }),
    };
  }
};

export const getCardData = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    /* Get the pk_key */
    const bearer = event.headers["authorization"];
    let pk_key = "";
    if (bearer) pk_key = bearer.replace("Bearer ", "");

    /* Get the token */
    const token = event.pathParameters?.token;

    /* Validate the data */
    const data = JSON.stringify({ pk_key, token });
    let dto: GetCardDataDTO | null = null;

    try {
      dto = (await transformAndValidate(
        GetCardDataDTO,
        data
      )) as GetCardDataDTO;
    } catch (err: any) {
      let errors: string[] = [];

      err.forEach((err) => {
        err.constraints &&
          Object.values(err.constraints).forEach((message) =>
            errors.push(message as string)
          );
      });

      return {
        statusCode: 400,
        body: JSON.stringify({ errors }),
      };
    }

    const repository = new DynamoDBCardRepository();
    const service = new GetCardDataUseCase(repository);

    return await service.run(dto.token);
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server Error" }),
    };
  }
};
