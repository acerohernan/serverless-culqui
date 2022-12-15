import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ name: "IsMonth", async: false })
export class IsMonthConstraint implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    return Number(text) > 0 && Number(text) < 13;
  }

  defaultMessage(args: ValidationArguments) {
    return "The ($value) is not a valid month!";
  }
}
