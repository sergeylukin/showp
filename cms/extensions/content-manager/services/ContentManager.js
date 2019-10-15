'use strict';

const uploadFiles = require('../../../node_modules/strapi-plugin-content-manager/utils/upload-files');

/**
 * A set of functions called "actions" for `ContentManager`
 */
module.exports = {

  async createMultipart(data, { files = {}, model, source } = {}) {
    if (model === 'tip') {
      // data = {...data, ...{slug: 'QQQQQ'}};
    }
    const entry = await strapi.query(model, source).create(data);

    await uploadFiles(entry, files, { model, source });

    return strapi.query(model, source).findOne({ id: entry.id });
  },

  async create(data, { files, model, source } = {}) {
    if (model === 'tip') {
      // data = {...data, ...{slug: 'QQQQQ'}};
    }
    const entry = await strapi.query(model, source).create(data);

    if (files) {
      await uploadFiles(entry, files, { model, source });
      return strapi.query(model, source).findOne({ id: entry.id });
    }

    return entry;
  }

};
