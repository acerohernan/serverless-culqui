import { Length, Validate } from "class-validator";
import { IsPkKeyConstraint } from "../../../shared/domain/constraints/IsPkToken";

export class GetCardDataDTO {
  @Validate(IsPkKeyConstraint, { message: "The pk_key is invalid" })
  pk_key: string;

  @Length(16, 16, { message: "The token needs to have 16 characters" })
  token: string;
}
