import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  // users-permissions needs a JWT secret at boot. On a FRESH database (Render/Neon)
  // there is no stored secret yet, so Strapi crashes with "Missing jwtSecret" unless
  // we provide one here. Prefer JWT_SECRET (Render generates it); fall back to
  // ADMIN_JWT_SECRET so environments without JWT_SECRET (cPanel/local) still boot.
  'users-permissions': {
    config: {
      jwtSecret: env('JWT_SECRET', env('ADMIN_JWT_SECRET')),
    },
  },
});

export default config;
