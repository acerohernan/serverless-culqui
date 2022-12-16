import {
  APIGatewayProxyEvent,
  APIGatewayProxyEventHeaders,
  APIGatewayProxyEventPathParameters,
  APIGatewayProxyEventQueryStringParameters,
  APIGatewayProxyEventStageVariables,
} from "aws-lambda";
import { HttpMethod } from "./types";

export function generateApiGatewayEvent(
  method: HttpMethod,
  path: string,
  {
    body,
    queryStringParameters,
    pathParameters,
    stageVariables,
    headers,
  }: {
    body?: Record<string, any>;
    queryStringParameters?: APIGatewayProxyEventQueryStringParameters;
    pathParameters?: APIGatewayProxyEventPathParameters;
    stageVariables?: APIGatewayProxyEventStageVariables;
    headers?: APIGatewayProxyEventHeaders;
  }
): APIGatewayProxyEvent {
  const event: APIGatewayProxyEvent = {
    body: body ? JSON.stringify(body) : "{}",
    path: "/test/hello",
    headers: {
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      "Accept-Encoding": "gzip, deflate, lzma, sdch, br",
      "Accept-Language": "en-US,en;q=0.8",
      "CloudFront-Forwarded-Proto": "https",
      "CloudFront-Is-Desktop-Viewer": "true",
      "CloudFront-Is-Mobile-Viewer": "false",
      "CloudFront-Is-SmartTV-Viewer": "false",
      "CloudFront-Is-Tablet-Viewer": "false",
      "CloudFront-Viewer-Country": "US",
      Host: "wt6mne2s9k.execute-api.us-west-2.amazonaws.com",
      "Upgrade-Insecure-Requests": "1",
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.82 Safari/537.36 OPR/39.0.2256.48",
      Via: "1.1 fb7cca60f0ecd82ce07790c9c5eef16c.cloudfront.net (CloudFront)",
      "X-Amz-Cf-Id": "nBsWBOrSHMgnaROZJK1wGCZ9PcRcSpq_oSXZNQwQ10OTZL4cimZo3g==",
      "X-Forwarded-For": "192.168.100.1, 192.168.1.1",
      "X-Forwarded-Port": "443",
      "X-Forwarded-Proto": "https",
      ...(headers || {}),
    },
    pathParameters: pathParameters || {},
    multiValueHeaders: {},
    isBase64Encoded: false,
    multiValueQueryStringParameters: {},
    resource: "/{proxy+}",
    httpMethod: "GET",
    queryStringParameters: queryStringParameters || {},
    stageVariables: stageVariables || {},
    requestContext: {
      authorizer: undefined,
      protocol: "",
      accountId: "",
      apiId: "",
      httpMethod: method,
      identity: {
        accessKey: "",
        accountId: "",
        apiKey: "",
        apiKeyId: "",
        caller: "",
        cognitoAuthenticationProvider: "",
        cognitoAuthenticationType: "",
        cognitoIdentityId: "",
        cognitoIdentityPoolId: "",
        principalOrgId: "",
        sourceIp: "",
        user: "",
        userAgent: "",
        userArn: "",
        clientCert: null,
      },
      path,
      stage: "",
      requestId: "",
      requestTimeEpoch: 3,
      resourceId: "",
      resourcePath: "",
    },
  };

  return event;
}
