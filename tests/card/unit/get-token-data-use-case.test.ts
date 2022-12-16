import { GetCardDataUseCase } from "../../../src/card/application/get-card-data";
import { CardReposiotryMock } from "./__mocks__/CardRepositoryMock";

describe("GetCardDataUseCase", () => {
  it("should return an array of errors when the pk_key is invalid", async () => {
    const repository = new CardReposiotryMock();
    const service = new GetCardDataUseCase(repository);

    const pk_key: string = "saddass";
    const token: string = "PcxsM0gqqj1kFQcg";

    const { statusCode, body: resultBody } = await service.run(pk_key, token);

    expect(statusCode).toBe(400);
    const errors = JSON.parse(resultBody)["errors"];
    expect(errors.length).toBeGreaterThan(0);
  });

  it("should return an array of errors when the token is invalid", async () => {
    const repository = new CardReposiotryMock();
    const service = new GetCardDataUseCase(repository);

    const pk_key: string = "pk_test_LsRBKejzCOEEWOsw";
    const token: string = "swadsa";

    const { statusCode, body: resultBody } = await service.run(pk_key, token);

    expect(statusCode).toBe(400);
    const errors = JSON.parse(resultBody)["errors"];
    expect(errors.length).toBeGreaterThan(0);
  });

  it("should search in the repository when the token and the pk_key are valid", async () => {
    const repository = new CardReposiotryMock();
    const service = new GetCardDataUseCase(repository);

    const pk_key: string = "pk_test_LsRBKejzCOEEWOsw";
    const token: string = "PcxsM0gqqj1kFQcg";

    const { statusCode } = await service.run(pk_key, token);

    expect(statusCode).toBe(200);
    repository.assertGetByTokenHasBeenCalledWith(token);
  });
});
