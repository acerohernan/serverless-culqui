import * as handler from "../../../src/handlers";
import { generateApiGatewayEvent } from "../../shared/event-generator";

describe("GET /token/{token} - Get Card Information", () => {
  it("should send a 400 status code if the token is invalid", async () => {
    const event = generateApiGatewayEvent("GET", "/token/{token}", {
      pathParameters: { token: "sasfdsfsd" },
      headers: {
        authorization: "Bearer pk_test_LsRBKejzCOEEWOsw",
      },
    });

    const res = await handler.getCardData(event);
    expect(res.statusCode).toBe(400);
  });

  it("should send a 400 status code if the pk_key is invalid", async () => {
    const event = generateApiGatewayEvent("GET", "/token/{token}", {
      pathParameters: { token: "sasfdsfsd" },
      headers: {
        authorization: "Bearer fsafafs",
      },
    });

    const res = await handler.getCardData(event);
    expect(res.statusCode).toBe(400);
  });

  it("should send a 404 status code if the card information not exists", async () => {
    const event = generateApiGatewayEvent("GET", "/token/{token}", {
      pathParameters: { token: "tfz8VwlG9BNIoBbj" },
      headers: {
        authorization: "Bearer pk_test_LsRBKejzCOEEWOsw",
      },
    });

    const res = await handler.getCardData(event);
    expect(res.statusCode).toBe(404);
  });

  it("should send a 200 status code if the card information exists", async () => {
    /* Creates the card information */
    const createEvent = generateApiGatewayEvent("POST", "/token", {
      body: {
        email: "acero@gmail.com",
        card_number: "4111111111111111",
        cvv: "132",
        expiration_month: "12",
        expiration_year: "2025",
      },
      headers: {
        authorization: "Bearer pk_test_LsRBKejzCOEEWOsw",
      },
    });

    const createRes = await handler.createToken(createEvent);
    const token = JSON.parse(createRes.body)["card_token"];

    if (!token)
      throw Error(
        `The token creating failed with status ${createRes.statusCode} - POST /token"`
      );

    /* Get the card information */
    const event = generateApiGatewayEvent("GET", "/token/{token}", {
      pathParameters: { token },
      headers: {
        authorization: "Bearer pk_test_LsRBKejzCOEEWOsw",
      },
    });

    const res = await handler.getCardData(event);
    expect(res.statusCode).toBe(200);
  });
});
