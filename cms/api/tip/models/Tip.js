'use strict';

const axios = require('axios');

const triggerStaticWebsitesBuild = () => {
  const urls = strapi
    && strapi.config
    && strapi.config.staticWebsiteBuildURLs;
  if (!(urls instanceof Array) || urls.length < 1) return;
  if (process.env.NODE_ENV !== 'production') return;
  axios.all(urls.map(l => axios.post(l, {})))
    .then(axios.spread(function (...res) {
      // all requests are now complete
      console.log('Sent triggers to Netlify');
      console.log(res);
    }))
    .catch(() => {
      // Ignore
    });
};

/**
 * Lifecycle callbacks for the `Tip` model.
 */

module.exports = {
  // Before saving a value.
  // Fired before an `insert` or `update` query.
  // beforeSave: async (model, attrs, options) => {},

  // After saving a value.
  // Fired after an `insert` or `update` query.
  // afterSave: async (model, response, options) => {},

  // Before fetching a value.
  // Fired before a `fetch` operation.
  // beforeFetch: async (model, columns, options) => {},

  // After fetching a value.
  // Fired after a `fetch` operation.
  // afterFetch: async (model, response, options) => {},

  // Before fetching all values.
  // Fired before a `fetchAll` operation.
  // beforeFetchAll: async (model, columns, options) => {},

  // After fetching all values.
  // Fired after a `fetchAll` operation.
  // afterFetchAll: async (model, response, options) => {},

  // Before creating a value.
  // Fired before an `insert` query.
  // beforeCreate: async (model, attrs, options) => {},

  // After creating a value.
  // Fired after an `insert` query.
  // afterCreate: async (model, attrs, options) => {},
  afterCreate: async () => {
    triggerStaticWebsitesBuild();
  },

  // Before updating a value.
  // Fired before an `update` query.
  // beforeUpdate: async (model, attrs, options) => {},

  // After updating a value.
  // Fired after an `update` query.
  // afterUpdate: async (model, attrs, options) => {},
  afterUpdate: async () => {
    triggerStaticWebsitesBuild();
  },

  // Before destroying a value.
  // Fired before a `delete` query.
  // beforeDestroy: async (model, attrs, options) => {},

  // After destroying a value.
  // Fired after a `delete` query.
  // afterDestroy: async (model, attrs, options) => {}
  afterDestroy: async () => {
    triggerStaticWebsitesBuild();
  },
};
