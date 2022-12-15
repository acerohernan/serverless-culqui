import { DynamoDBRepository } from "../../shared/infrastructure/DynamoDBRepository";
import { Card } from "../domain/Card";
import { CardRepository } from "../domain/CardRepository";

export class DynamoDBCardRepository
  extends DynamoDBRepository<Card>
  implements CardRepository
{
  TableName: string = "CardsTable";

  async create(card: Card): Promise<void> {
    return this.persist(card);
  }

  async getByToken(token: string): Promise<Card | null> {
    const cards = await this.scan({
      FilterExpression: "card_token = :t",
      ExpressionAttributeValues: {
        ":t": token,
      },
      TableName: this.TableName,
    });

    if (cards.length < 1) return null;

    return cards[0];
  }
}
