import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ name: "IsExpirationYear", async: false })
export class IsExpirationYearConstraint
  implements ValidatorConstraintInterface
{
  validate(text: string, args: ValidationArguments) {
    const year = new Date().getFullYear();
    const yearPlus5 = year + 5;

    return Number(text) >= year && Number(text) < yearPlus5;
  }

  defaultMessage(args: ValidationArguments) {
    return "The ($value) is not a valid expiration year!";
  }
}
