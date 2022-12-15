import { Card } from "./Card";

export interface CardRepository {
  create: (card: Card) => Promise<void>;
  getByToken: (token: string) => Promise<Card | null>;
}
