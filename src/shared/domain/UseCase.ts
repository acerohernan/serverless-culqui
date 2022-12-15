import { APIGatewayProxyResult } from "aws-lambda";

export interface UseCase {
  run: (...args: any) => Promise<APIGatewayProxyResult>;
}
