export class RandomString {
  static generate(length: number): string {
    let mask = "";
    mask += "abcdefghijklmnopqrstuvwxyz";
    mask += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    mask += "0123456789";
    let result = "";
    for (var i = length; i > 0; --i)
      result += mask[Math.floor(Math.random() * mask.length)];
    return result;
  }
}
