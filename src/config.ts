export const PORT = process.env.PORT

export const environment = process.env.ENVIRONMENT as string

export const corsUrls = [
  process.env.CORS_URL_1,
  environment === 'development' && 'http://localhost:3000',
] as string[]