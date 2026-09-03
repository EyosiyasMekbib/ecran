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
  // Media must not live on the container's own disk. The host filesystem is
  // ephemeral, so every deploy, restart, or idle spin-down wiped public/uploads:
  // the database kept each file's record while the bytes disappeared, which is why
  // an upload looked fine and then 404'd later. Cloudinary stores them off-box.
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
});

export default config;
