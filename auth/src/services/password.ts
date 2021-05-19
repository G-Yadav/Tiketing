import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const asyncScrypt = promisify(scrypt);

export class Password {
  public static async hash(password: string) {
    const salt = randomBytes(16).toString("hex");
    const hashBuf = (await asyncScrypt(password, salt, 64)) as Buffer;

    return `${hashBuf.toString("hex")}.${salt}`;
  }

  public static async verify(password: string, suppliedPassword: string) {
    const [hash, salt] = suppliedPassword.split(".");
    const hashbuf = (await asyncScrypt(password, salt, 64)) as Buffer;

    return hash === hashbuf.toString("hex");
  }
}
