import jwt, { JwtPayload } from 'jsonwebtoken';

interface SignOptions {
  expiresIn?: string | number;
}

const DEFAULT_SIGN_OPTIONS: SignOptions = {
  expiresIn: '1h',
};

export function sign(
  payload: JwtPayload,
  options: SignOptions = DEFAULT_SIGN_OPTIONS,
) {
  const secret_key = process.env.JWT_SECRET_KEY;
  const token = jwt.sign(payload, secret_key!, options);
  return token;
}

export function verify(token: string) {
  try {
    const secret_key = process.env.JWT_SECRET_KEY;
    const payload = jwt.verify(token, secret_key!) as JwtPayload;
    return payload;
  } catch (error) {
    return null;
  }
}
