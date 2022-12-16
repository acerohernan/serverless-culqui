import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { CreateTokenUseCase } from "./application/create-token";
import { GetCardDataUseCase } from "./application/get-card-data";
import { DynamoDBCardRepository } from "./infraestructure/DynamoDBCardReposiotry";

export const createToken = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    /* Get the pk_key */
    const bearer = event.headers["authorization"];
    let pk_key = "";
    if (bearer) pk_key = bearer.replace("Bearer ", "");

    /* Initialize the use case */
    const repository = new DynamoDBCardRepository();
    const service = new CreateTokenUseCase(repository);

    return await service.run(pk_key, JSON.parse(event.body || "{}"));
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
    const token = String(event.pathParameters?.token);

    /* Initialize the use case */
    const repository = new DynamoDBCardRepository();
    const service = new GetCardDataUseCase(repository);

    return await service.run(pk_key, token);
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server Error" }),
    };
  }
};
