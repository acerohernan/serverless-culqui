import * as AWS from "aws-sdk";
import { DynamoDB } from "aws-sdk";

export abstract class DynamoDBRepository<T extends Record<string, any>> {
  private docClient: DynamoDB.DocumentClient;
  abstract TableName: string;

  constructor() {
    this.docClient = new AWS.DynamoDB.DocumentClient();
  }

  async persist(Item: T): Promise<void> {
    try {
      await this.docClient
        .put({
          TableName: this.TableName,
          Item,
        })
        .promise();
    } catch (err) {
      console.log("Error to persist the entity", Item);
    }
  }

  async getByKey(key: string, value: any): Promise<T | null> {
    try {
      const output = await this.docClient
        .get({
          TableName: this.TableName,
          Key: {
            [key]: value,
          },
        })
        .promise();

      const item = output.Item;

      if (!item) return null;

      return item as T;
    } catch (err) {
      return null;
    }
  }

  async scan(params: DynamoDB.DocumentClient.QueryInput): Promise<Array<T>> {
    try {
      const output = await this.docClient.scan(params).promise();
      if (!output.Items) return [];

      return output.Items as T[];
    } catch (err) {
      return [];
    }
  }
}
