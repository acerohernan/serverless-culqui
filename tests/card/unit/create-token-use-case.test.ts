import { CreateTokenUseCase } from "../../../src/card/application/create-token";
import { CreateTokenDTO } from "../../../src/card/domain/dtos/CreateTokenDTO";
import { CardReposiotryMock } from "./__mocks__/CardRepositoryMock";

describe("CreateTokenUseCase", () => {
  it("should return an array of errors when the card_number is invalid", async () => {
    const repository = new CardReposiotryMock();
    const service = new CreateTokenUseCase(repository);

    const pk_key: string = "pk_test_LsRBKejzCOEEWOsw";
    const body: Omit<CreateTokenDTO, "pk_key"> = {
      card_number: "",
      cvv: "123",
      email: "acero@gmail.com",
      expiration_month: "12",
      expiration_year: "2025",
    };
    const { statusCode, body: resultBody } = await service.run(pk_key, body);

    expect(statusCode).toBe(400);
    const errors = JSON.parse(resultBody)["errors"];
    expect(errors.length).toBeGreaterThan(0);
  });

  it("should return an array of errors when the cvv is invalid", async () => {
    const repository = new CardReposiotryMock();
    const service = new CreateTokenUseCase(repository);

    const pk_key: string = "pk_test_LsRBKejzCOEEWOsw";
    const body: Omit<CreateTokenDTO, "pk_key"> = {
      card_number: "4111111111111111",
      cvv: "123232",
      email: "acero@gmail.com",
      expiration_month: "12",
      expiration_year: "2025",
    };
    const { statusCode, body: resultBody } = await service.run(pk_key, body);

    expect(statusCode).toBe(400);
    const errors = JSON.parse(resultBody)["errors"];
    expect(errors.length).toBeGreaterThan(0);
  });

  it("should return an array of errors when the email is invalid", async () => {
    const repository = new CardReposiotryMock();
    const service = new CreateTokenUseCase(repository);

    const pk_key: string = "pk_test_LsRBKejzCOEEWOsw";
    const body: Omit<CreateTokenDTO, "pk_key"> = {
      card_number: "4111111111111111",
      cvv: "123",
      email: "acero@othermail.com",
      expiration_month: "12",
      expiration_year: "2025",
    };
    const { statusCode, body: resultBody } = await service.run(pk_key, body);

    expect(statusCode).toBe(400);
    const errors = JSON.parse(resultBody)["errors"];
    expect(errors.length).toBeGreaterThan(0);
  });

  it("should return an array of errors when the expiration_month is invalid", async () => {
    const repository = new CardReposiotryMock();
    const service = new CreateTokenUseCase(repository);

    const pk_key: string = "pk_test_LsRBKejzCOEEWOsw";
    const body: Omit<CreateTokenDTO, "pk_key"> = {
      card_number: "4111111111111111",
      cvv: "123",
      email: "acero@gmail.com",
      expiration_month: "13",
      expiration_year: "2025",
    };
    const { statusCode, body: resultBody } = await service.run(pk_key, body);

    expect(statusCode).toBe(400);
    const errors = JSON.parse(resultBody)["errors"];
    expect(errors.length).toBeGreaterThan(0);
  });

  it("should return an array of errors when the expiration_year is invalid", async () => {
    const repository = new CardReposiotryMock();
    const service = new CreateTokenUseCase(repository);

    const pk_key: string = "pk_test_LsRBKejzCOEEWOsw";
    const body: Omit<CreateTokenDTO, "pk_key"> = {
      card_number: "4111111111111111",
      cvv: "123",
      email: "acero@gmail.com",
      expiration_month: "12",
      expiration_year: "2030",
    };
    const { statusCode, body: resultBody } = await service.run(pk_key, body);

    expect(statusCode).toBe(400);
    const errors = JSON.parse(resultBody)["errors"];
    expect(errors.length).toBeGreaterThan(0);
  });

  it("should return an array of errors when the pk_key is invalid", async () => {
    const repository = new CardReposiotryMock();
    const service = new CreateTokenUseCase(repository);

    const pk_key: string = "sadasd";
    const body: Omit<CreateTokenDTO, "pk_key"> = {
      card_number: "4111111111111111",
      cvv: "123",
      email: "acero@gmail.com",
      expiration_month: "12",
      expiration_year: "2030",
    };
    const { statusCode, body: resultBody } = await service.run(pk_key, body);

    expect(statusCode).toBe(400);
    const errors = JSON.parse(resultBody)["errors"];
    expect(errors.length).toBeGreaterThan(0);
  });

  it("should save in the repository when the all the properties are valid", async () => {
    const repository = new CardReposiotryMock();
    const service = new CreateTokenUseCase(repository);

    const pk_key: string = "pk_test_LsRBKejzCOEEWOsw";
    const body: Omit<CreateTokenDTO, "pk_key"> = {
      card_number: "4111111111111111",
      cvv: "123",
      email: "acero@gmail.com",
      expiration_month: "12",
      expiration_year: "2022",
    };
    const { statusCode, body: resultBody } = await service.run(pk_key, body);

    expect(statusCode).toBe(201);
    repository.assertCreateHasBeenCalledWith(JSON.parse(resultBody));
  });
});
