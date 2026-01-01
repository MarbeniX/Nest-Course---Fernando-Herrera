export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV,
  mongodb: process.env.MONGODB,
  port: Number(process.env.PORT),
});
