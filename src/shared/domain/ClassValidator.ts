import { ClassType, transformAndValidate } from "class-transformer-validator";

export class ClassValidator {
  static async validate<T>(
    classValidator: ClassType<object>,
    jsonString: string
  ): Promise<{ result: T | null; errors: Array<string> | null }> {
    try {
      const result = (await transformAndValidate(
        classValidator,
        jsonString
      )) as T;

      return {
        result,
        errors: null,
      };
    } catch (err: any) {
      let errors: string[] = [];

      err.forEach((err) => {
        err.constraints &&
          Object.values(err.constraints).forEach((message) =>
            errors.push(message as string)
          );
      });

      return {
        result: null,
        errors,
      };
    }
  }
}
