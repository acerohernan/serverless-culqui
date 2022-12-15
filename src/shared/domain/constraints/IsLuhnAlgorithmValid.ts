import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ name: "IsLuhnAlgorithmValid", async: false })
export class IsLuhnAlgorithmValid implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    var nCheck = 0,
      nDigit = 0,
      bEven = false;
    text = text.replace(/\D/g, "");

    for (var n = text.length - 1; n >= 0; n--) {
      var cDigit = text.charAt(n),
        nDigit = parseInt(cDigit, 10);

      if (bEven) {
        if ((nDigit *= 2) > 9) nDigit -= 9;
      }

      nCheck += nDigit;
      bEven = !bEven;
    }

    return nCheck % 10 == 0;
  }

  defaultMessage(args: ValidationArguments) {
    return "The ($value) not match with Luhn algorithm!";
  }
}
