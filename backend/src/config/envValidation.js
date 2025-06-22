import Joi from 'joi';

const envSchema = Joi.object({
  PORT: Joi.number().default(3001),

  DATABASE_URL: Joi.string().uri().required(),

  JWT_SECRET: Joi.string().required(),
  ADMIN_SECRET: Joi.string().required(),

  SMTP_HOST: Joi.string().required(),
  SMTP_PORT: Joi.number().required(),
  SMTP_SECURE: Joi.boolean().required(),
  SMTP_USER: Joi.string().required(),
  SMTP_PASS: Joi.string().required(),
  SMTP_FROM: Joi.string().email().required(),

  FRONTEND_URL: Joi.string().uri().required()
}).unknown(true); // allow other env vars

const { error, value: envVars } = envSchema.validate(process.env);

if (error) {
  throw new Error(`❌ Environment validation error: ${error.message}`);
}

export default envVars;
