import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ name: "IsPkKey", async: false })
export class IsPkKeyConstraint implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    if (!text) return false;

    const arr = text.split("_");

    if (arr.length !== 3) return false;

    if (arr[0] !== "pk") return false;

    if (arr[2].length !== 16) return false;

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return "The ($value) is not a valid pk_token";
  }
}
