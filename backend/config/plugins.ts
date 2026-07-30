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
  // Contact-form notifications go out through the cPanel mailbox that already
  // handles ecran-et.org mail, so no third-party sender and no DNS changes.
  //
  // Port 465 (implicit TLS) is what cPanel exposes and is the most reliable of
  // the three open ports. Timeouts are deliberately short: some hosts block
  // outbound SMTP, and a blocked port manifests as a hang, not a refusal — we
  // would rather fail in seconds and log it than tie up a connection.
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST', 'mail.ecran-et.org'),
        port: env.int('SMTP_PORT', 465),
        secure: env.bool('SMTP_SECURE', true),
        auth: {
          user: env('SMTP_USERNAME'),
          pass: env('SMTP_PASSWORD'),
        },
        connectionTimeout: 10_000,
        greetingTimeout: 10_000,
        socketTimeout: 15_000,
      },
      settings: {
        defaultFrom: env('CONTACT_FROM_EMAIL', 'info@ecran-et.org'),
        defaultReplyTo: env('CONTACT_NOTIFY_EMAIL', 'info@ecran-et.org'),
      },
    },
  },
});

export default config;
