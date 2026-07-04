'use strict';

/**
 * Passenger / cPanel "Setup Node.js Application" entry point.
 *
 * cPanel's Node selector runs this file to boot the app. It injects PORT
 * (and serves the app at the subdomain's document root), so Strapi listens
 * on the port Passenger assigns. Run `npm run build` before starting so the
 * admin panel exists.
 *
 * Set the cPanel app's "Application startup file" to: server.js
 */
const { createStrapi } = require('@strapi/strapi');

// TypeScript project: point Strapi at the compiled output produced by `npm run build`.
// tsconfig outDir is "dist". Without distDir, a custom entry file will not boot the
// built app reliably under Passenger.
createStrapi({ distDir: './dist' }).start();
