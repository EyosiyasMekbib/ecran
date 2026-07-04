import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Server => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('PUBLIC_URL', undefined),
  // Behind cPanel/Apache + Passenger. Trust X-Forwarded-* so Koa emits correct
  // https://cms.ecran-et.com URLs (password-reset links, cookies, OAuth).
  proxy: env.bool('IS_PROXIED', true),
  app: {
    keys: env.array('APP_KEYS'),
  },
});

export default config;
