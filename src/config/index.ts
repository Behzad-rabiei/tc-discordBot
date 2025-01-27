import Joi from 'joi';

const envVarsSchema = Joi.object()
    .keys({
        NODE_ENV: Joi.string().valid('production', 'development', 'local', 'test').required(),
        DB_HOST: Joi.string().required().description('Mongo DB url'),
        DB_PORT: Joi.string().required().description('Mongo DB port'),
        DB_USER: Joi.string().required().description('Mongo DB username'),
        DB_PASSWORD: Joi.string().required().description('Mongo DB password'),
        DB_NAME: Joi.string().required().description('Mongo DB name'),
        DISCROD_CLIENT_ID: Joi.string().required().description('Discord clinet id'),
        DISCORD_CLIENT_SECRET: Joi.string().required().description('Discord clinet secret'),
        DISCORD_BOT_TOKEN: Joi.string().required().description('Discord bot token'),
    })
    .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}
export default {
    env: envVars.NODE_ENV,
    mongoose: {
        serverURL: envVars.NODE_ENV === 'local' || envVars.NODE_ENV === 'test' ? `mongodb://127.0.0.1:27017/RnDAO-${envVars.NODE_ENV}` : `mongodb://${envVars.DB_USER}:${envVars.DB_PASSWORD}@${envVars.DB_HOST}:${envVars.DB_PORT}/${envVars.DB_NAME}`,
        botURL: envVars.NODE_ENV === 'local' || envVars.NODE_ENV === 'test' ? `mongodb://127.0.0.1:27017` : `mongodb://${envVars.DB_USER}:${envVars.DB_PASSWORD}@${envVars.DB_HOST}:${envVars.DB_PORT}`,
    },
    discord: {
        clientId: envVars.DISCROD_CLIENT_ID,
        clientSecret: envVars.DISCORD_CLIENT_SECRET,
        botToken: envVars.DISCORD_BOT_TOKEN,
    }
}