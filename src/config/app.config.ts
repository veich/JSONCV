import { registerAs } from '@nestjs/config';

export default registerAs('appConfig', () => ({
  port: parseInt(process.env.PORT) || 3000,
  nodenv: process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET,
}));
