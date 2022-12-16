import * as handler from "../../../src/handlers";
import { generateApiGatewayEvent } from "../../shared/event-generator";

describe("POST /token - Create token", () => {
  it("should send a 400 status code if the request have a invalid pk_key", async () => {
    const event = generateApiGatewayEvent("POST", "/token", {
      body: {
        email: "acero@gmail.com",
        card_number: "4111111111111111",
        cvv: "132",
        expiration_month: "12",
        expiration_year: "2025",
      },
      headers: {
        authorization: "Bearer sfsdfsdf",
      },
    });

    const res = await handler.createToken(event);
    expect(res.statusCode).toBe(400);
  });

  it("should send a 400 status code if the request have a invalid card body", async () => {
    const event = generateApiGatewayEvent("POST", "/token", {
      body: {
        email: "sadsadsad",
        card_number: "41",
        cvv: "13232",
        expiration_month: "12asd",
        expiration_year: "2025asd",
      },
      headers: {
        authorization: "Bearer pk_test_LsRBKejzCOEEWOsw",
      },
    });

    const res = await handler.createToken(event);
    expect(res.statusCode).toBe(400);
  });

  it("should send a 200 status code if the request have a valid card body", async () => {
    const event = generateApiGatewayEvent("POST", "/token", {
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

    const res = await handler.createToken(event);
    expect(res.statusCode).toBe(201);
  });
});
