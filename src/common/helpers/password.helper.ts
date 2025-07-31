import bcrypt from 'bcrypt';

export class PasswordHelper {
  static async comparePassword(
    password: string,
    passwordHash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, passwordHash);
  }

  static async hashPassword(
    password: string,
    salt: number = 10,
  ): Promise<string> {
    return await bcrypt.hash(password, salt);
  }
}
