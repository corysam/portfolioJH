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
  register() {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const publicRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    if (!publicRole) {
      strapi.log.warn('[bootstrap] Public role missing — skipping permissions seed.');
      return;
    }

    for (const action of PUBLIC_READ_ACTIONS) {
      const existing = await strapi
        .query('plugin::users-permissions.permission')
        .findOne({ where: { action, role: publicRole.id } });

      if (existing) continue;

      await strapi.query('plugin::users-permissions.permission').create({
        data: { action, role: publicRole.id },
      });
      strapi.log.info(`[bootstrap] Granted Public: ${action}`);
    }
  },
};
