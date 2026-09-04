import type { Core } from '@strapi/strapi';

const PUBLIC_READ_ACTIONS = [
  'api::project.project.find',
  'api::project.project.findOne',
  'api::category.category.find',
  'api::category.category.findOne',
  'api::about.about.find',
  'api::site-setting.site-setting.find',
  'api::hero.hero.find',
  'api::header.header.find',
  'api::footer.footer.find',
];

export default {
  //register() {},

  register({ strapi }) {
    const target = process.env.REVALIDATE_URL;
    const secret = process.env.REVALIDATE_SECRET;
    if (!target || !secret) return;

    const ping = () => {
      fetch(`${target}?secret=${secret}`, { method: 'POST' })
        .then((r) => strapi.log.info(`revalidate -> ${r.status}`))
        .catch((e) => strapi.log.warn(`revalidate failed: ${e.message}`));
    };

    const WRITES = ['create', 'update', 'delete', 'publish', 'unpublish', 'discardDraft'];

    strapi.documents.use(async (context, next) => {
      const result = await next();
      if (WRITES.includes(context.action)) ping();
      return result;
    });
  },

  bootstrap() {},

  // async bootstrap({ strapi }: { strapi: Core.Strapi }) {
  //   const publicRole = await strapi
  //     .query('plugin::users-permissions.role')
  //     .findOne({ where: { type: 'public' } });

  //   if (!publicRole) {
  //     strapi.log.warn('[bootstrap] Public role missing — skipping permissions seed.');
  //     return;
  //   }

  //   for (const action of PUBLIC_READ_ACTIONS) {
  //     const existing = await strapi
  //       .query('plugin::users-permissions.permission')
  //       .findOne({ where: { action, role: publicRole.id } });

  //     if (existing) continue;

  //     await strapi.query('plugin::users-permissions.permission').create({
  //       data: { action, role: publicRole.id },
  //     });
  //     strapi.log.info(`[bootstrap] Granted Public: ${action}`);
  //   }
  // },
};
