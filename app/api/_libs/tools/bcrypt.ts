import { compare, hash } from 'bcryptjs';

export class Bcrypt {
  public async dataToHash(data: string) {
    return hash(data, 10);
  }

  public async dataCompare(hashedData: string, data: string) {
    return compare(data, hashedData);
  }
}
