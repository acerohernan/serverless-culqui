import { Card } from "../../../../src/card/domain/Card";
import { CardRepository } from "../../../../src/card/domain/CardRepository";

export class CardReposiotryMock implements CardRepository {
  private createMock: jest.Mock;
  private getByTokenMock: jest.Mock;

  constructor() {
    this.createMock = jest.fn();
    this.getByTokenMock = jest.fn();
  }

  async create(card: Card): Promise<void> {
    this.createMock(card);
  }

  async getByToken(token: string): Promise<Card | null> {
    this.getByTokenMock(token);
    return {
      email: "acero@gmail.com",
      card_number: "4111111111111111",
      cvv: "132",
      expiration_month: "12",
      expiration_year: "2025",
      pk_key: "pk_test_LsRBKejzCOEEWOsw",
      card_token: token,
      id: "c3d71af7-8679-4a70-a6d6-2e4024296b2e",
    };
  }

  assertCreateHasBeenCalled(): void {
    expect(this.createMock).toHaveBeenCalled();
  }

  assertCreateHasBeenCalledWith(expected: Card): void {
    expect(this.createMock).toHaveBeenCalledWith(expected);
  }

  assertGetByTokenHasBeenCalledWith(expected: string): void {
    expect(this.getByTokenMock).toHaveBeenCalledWith(expected);
  }
}
