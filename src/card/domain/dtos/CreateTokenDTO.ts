import {
  IsCreditCard,
  IsEmail,
  IsNumberString,
  Length,
  Matches,
  Validate,
} from "class-validator";
import { IsExpirationYearConstraint } from "../../../shared/domain/constraints/IsExpirationYear";
import { IsLuhnAlgorithmValid } from "../../../shared/domain/constraints/IsLuhnAlgorithmValid";
import { IsMonthConstraint } from "../../../shared/domain/constraints/IsMonth";
import { IsPkKeyConstraint } from "../../../shared/domain/constraints/IsPkToken";

export class CreateTokenDTO {
  @Validate(IsLuhnAlgorithmValid, {
    message: "The card_number not match with Luhn algorithm",
  })
  @IsCreditCard({ message: "Enter a valid card_number" })
  @Length(13, 16, {
    message: "The card_number length must be a number between 13 and 16",
  })
  @IsNumberString(
    {},
    { message: "The card_number only accepts numbers in the string" }
  )
  card_number: string;

  @Length(3, 4, {
    message: "The cvv length must be a number between 3 and 4",
  })
  @IsNumberString({}, { message: "The cvv only accepts numbers in the string" })
  cvv: string;

  @Validate(IsMonthConstraint, {
    message: "The expiration_month must be a number between 1 and 12",
  })
  @Length(1, 2, {
    message: "The expiration_month lenght must be between 1 and 2",
  })
  @IsNumberString(
    {},
    { message: "The expiration_month only accepts numbers in the string" }
  )
  expiration_month: string;

  @Validate(IsExpirationYearConstraint, {
    message:
      "The expiration_year value must be between this year and 5 years in the future",
  })
  @Length(4, 4, { message: "The expiration_year must have 4 numbers" })
  @IsNumberString(
    {},
    { message: "The expiration_year only accepts numbers in the string" }
  )
  expiration_year: string;

  @IsEmail(
    {},
    {
      message: "Enter a valid email",
    }
  )
  @Matches(/gmail.com|hotmail.com|yahoo.es/, {
    message:
      "Only the following domains are accepted: gmail.com, hotmail.com, yahoo.es.",
  })
  email: string;

  @Validate(IsPkKeyConstraint, { message: "The pk_key is invalid" })
  pk_key: string;
}
